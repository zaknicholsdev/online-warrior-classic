const { Router } = require('express');
const router = new Router();
const { wrapAsync } = require('../errors/index');
const db = require('../db/index');
const { isAuth } = require('../jwt/index');

router.post('/:id', wrapAsync(async (req, res) => {
    const { body } = req.body;
    const { id } = req.params;

    const getCurrentTime = () => {
        const newDate = new Date();
        const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const date = newDate.toDateString();
        return `${date} ${time}`;
    };

    const comment = await db.query('insert into comments (athlete_id, user_id, body, created_on) values ($1, $2, $3, $4) returning *', [id, 2, body, getCurrentTime()]);
    console.log(comment)
    res.json(comment.rows[0]);
}));

router.put('/:id', wrapAsync(async (req, res) => {
    // const userId = req.user.id;
    const { id } = req.params;
    const { body } = req.body;
    const comment = await db.query('update comments set body = $1 where comment_id = $2 and user_id = $3 returning *', [body, id, 2]);
    res.json(comment.rows[0]);
}));

router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const comments = await db.query('select * from comments where athlete_id = $1', [id]);
    res.json(comments.rows)
}));

router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = 1;
    const getComment = await db.query('select * from comments where comment_id = $1 and user_id = $2', [id, 1]);
    if (getComment.rows[0].user_id !== userId) {
        return res.json({ msg: 'You cannot delete other users comments.' })
    }

    if (getComment.rows.length <= 0) {
        return res.json({ msg: 'This comment does not exist.' });
    }

    await db.query('delete from comments where comment_id = $1 and user_id = $2', [id, 1]);
    res.json({ msg: 'Successfully deleted comment' });
}));

module.exports = router;