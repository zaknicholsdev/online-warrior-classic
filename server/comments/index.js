const { Router } = require('express');
const router = new Router();
const { wrapAsync } = require('../errors/index');
const db = require('../db/index');
const { isAuth } = require('../jwt/index');

router.post('/:id', isAuth, wrapAsync(async (req, res) => {
    const myComment = req.body.comment;
    const { id } = req.params;
    const userId = req.user.id;

    const username = await db.query('select username from users where user_id = $1', [userId]);

    const getCurrentTime = () => {
        const newDate = new Date();
        const time = newDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const date = newDate.toDateString();
        return `${date} ${time}`;
    };

    const comment = await db.query('insert into comments (athlete_id, user_id, body, username, created_on) values ($1, $2, $3, $4, $5) returning *', [id, userId, myComment, username.rows[0].username, getCurrentTime()]);
    res.json(comment.rows[0]);
}));

router.put('/:id', isAuth, wrapAsync(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { body } = req.body;
    const comment = await db.query('update comments set body = $1 where comment_id = $2 and user_id = $3 returning *', [body, id, userId]);
    res.json(comment.rows[0]);
}));

router.get('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const comments = await db.query('select * from comments where athlete_id = $1 order by comment_id desc', [id]);
    res.json(comments.rows)
}));

router.delete('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const getComment = await db.query('select * from comments where comment_id = $1 and user_id = $2', [id, userId]);
    if (getComment.rows[0].user_id !== userId) {
        return res.json({ msg: 'You cannot delete other users comments.' });
    };

    if (getComment.rows.length <= 0) {
        return res.json({ msg: 'This comment does not exist.' });
    };

    await db.query('delete from comments where comment_id = $1 and user_id = $2', [id, userId]);
    res.json({ msg: 'Successfully deleted comment.' });
}));

module.exports = router;