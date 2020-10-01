const express = require('express');
const db = require('../db');
const { wrapAsync } = require('../errors/index');
const { isAuth } = require('../jwt/index');

const router = express.Router();

router.get('/', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.user;
    const athletes = await db.query('select athletes.athlete_id, athletes.name, athletes.image_url, count(case when votes.vote = true then vote end) as likes, count(case when votes.vote = true and user_id = $1 then vote end) as liked_athletes from athletes left outer join votes on votes.athlete_id = athletes.athlete_id group by athletes.athlete_id order by likes desc', [id]);
    res.json({
        athletes: athletes.rows
    });
}));

router.get('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const athlete = await db.query('select * from athletes where athlete_id = $1', [id]);
    const hasVoted = await db.query('select vote from votes where user_id = $1 and athlete_id = $2', [userId, id]);
    const totalLikes = await db.query('select count(case when vote = true then vote end) as likes from votes where vote = true and athlete_id = $1', [id]);
    res.json({
        athlete: athlete.rows[0],
        likes: totalLikes.rows[0],
        tOrF: hasVoted.rows[0]
    });
}));

router.post('/', isAuth, wrapAsync(async (req, res) => {
    const { name, category, image_url } = req.body;
    console.log(req.body);
    const athlete = await db.query('insert into athletes (name, category, image_url) values ($1, $2, $3) returning *', [name, category, image_url]);
    const upvote = await db.query('insert into votes (user_id, athlete_id, vote) values ($1, $2, $3) returning *', [1, athlete.rows[0].athlete_id, true]);
    res.json(upvote.rows);
}));

router.post('/:id/like', isAuth, wrapAsync(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const hasVoted = await db.query('select vote from votes where user_id = $1 and athlete_id = $2', [userId, id]);
    if (hasVoted.rows[0] === undefined) {
        const i = await db.query('insert into votes (user_id, athlete_id, vote) values ($1, $2, $3) returning *', [userId, id, true]);
        const s = await db.query('select count(case when votes.vote = true then vote end) as likes from votes where athlete_id = $1', [id])
        res.json({
            hasLiked: i.rows[0].vote,
            likes: s.rows[0].likes
        });
    } else {
        const like = await db.query('update votes set vote = not vote where user_id = $1 and athlete_id = $2 returning *', [userId, id]);
        const otherSelect = await db.query('select count(case when votes.vote = true then vote end) as likes from votes where athlete_id = $1', [id])
        res.json({
            hasLiked: like.rows[0].vote,
            likes: otherSelect.rows[0].likes
        });
    }
}));

module.exports = router;