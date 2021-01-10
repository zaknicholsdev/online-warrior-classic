const { Router } = require('express');
const router = new Router();
const { wrapAsync } = require('../errors/index');
const db = require('../db/index');
const { isAuth, signPayload } = require('../jwt/index');
const { hashPassword, comparePasswords } = require('../bcrypt/index');
const { upload } = require('../multer/index');

// Get all users.
router.get('/', wrapAsync(async (req, res) => {
    const { rows } = await db.query('select * from users');
    if (rows.length <= 0) {
        res.status(404).json({ msg: 'There are no users.' })
    };
    res.json(rows);
}));

router.get('/:id', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { rows } = await db.query('select * from users where user_id = $1', [id]);
    res.json(rows);
}));

router.post('/upload', upload.single('myImage'), wrapAsync(async (req, res) => {
    console.log(req.file);
    res.json({ file: req.file });
}));

// Get own account.
router.get('/me', isAuth, wrapAsync(async (req, res) => {
    const { id } = req.user;
    const { rows } = await db.query('select username, user_id from users where user_id = $1', [id]);
    const likedAthletes = await db.query('select athletes.athlete_id, athletes.name, athletes.image_url from votes left outer join athletes on (votes.athlete_id = athletes.athlete_id) where votes.vote = true and user_id = $1', [id]);
    if (rows.length <= 0) {
        return res.status(404).json({ msg: 'This user does not exist.' });
    };
    res.json({
        msg: 'You\re logged in',
        user: rows[0],
        likedAthletes: likedAthletes.rows
    });
}));

// Create account.
router.post('/register', wrapAsync(async (req, res) => {
    // if (req.headers.cookie) { return res.json({ msg: 'You\'re already logged in.' }) };
    const { username, password } = req.body;

    const user = await db.query('select username from users where username = $1', [username]);

    if (user.rows.length > 0) {
        return res.status(409).json({ msg: 'This username has already been taken.' })
    }

    const hash = await hashPassword(password);

    const { rows } = await db.query('insert into users (username, password) values ($1, $2) returning *', [username, hash]);

    const payload = {
        user: {
            id: rows[0].user_id
        }
    };

    signPayload(
        payload,
        'shhh',
        { expiresIn: '5d' },
        (err, token) => {
            if (err) return res.status(401).json({ msg: 'You\'re not authenticated.' });
            res.cookie('auth-token', token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: false,
                secure: false,
                path: "/"
            }).json({ msg: 'You\'re logged in.' })
        }
    );
}));

// Login user.
router.post('/login', wrapAsync(async (req, res) => {
    if (req.headers.cookie) { return res.json({ msg: 'You\'re already logged in.' }) };
    const { username, password } = req.body;
    const user = await db.query('select * from users where username = $1', [username]);
    console.log(user.rows[0]);

    if (!user.rows[0]) {
        return res.status(404).json({ msg: 'User not found.' });
    };

    const compare = await comparePasswords(password, user.rows[0].password);

    if (compare !== true) {
        return res.status(401).json({ msg: 'Passwords do not match.' });
    };

    const payload = {
        user: {
            id: user.rows[0].user_id
        }
    };

    signPayload(
        payload,
        'shhh',
        { expiresIn: '5d' },
        (err, token) => {
            if (err) throw new Error('You\'re not authenticated.');
            res.cookie('auth-token', token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: false,
                secure: false,
                path: "/"
            }).json({ success: 'You\'re logged in.' })
        }
    );

}));

router.delete('/logout', isAuth, wrapAsync(async (req, res) => {
    res.clearCookie('auth-token').json({ msg: 'Cookie deleted. You\'ve been logged out.' })
}));

// Edit own account
router.put('/edit-account', isAuth, wrapAsync(async (req, res) => {
    const { username } = req.body;
    const { id } = req.user;

}));

// Delete own account.
router.delete('/me', isAuth, wrapAsync(async (req, res) => {
    if (user.rows.length <= 0) {
        throw new Error('This user doesn\'t exist.');
    };

    res.clearCookie('auth-token').json({ msg: 'User deleted.' });
}));

module.exports = router;