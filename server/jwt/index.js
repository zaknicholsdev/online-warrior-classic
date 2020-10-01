const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    if (!req.headers.cookie) {
        return res.status(401).json({ msg: 'No token. Authorization denied' });
    }

    const token = req.headers.cookie
        .split('; ')
        .find(row => row.startsWith('auth-token'))
        .split('=')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    };

    jwt.verify(token, 'shhh', (error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: 'Token is not valid.' });
        } else {
            req.user = decoded.user;
            next();
        };
    });
};

// const sign = (payload) => {
//     jwt.sign(
//         payload,
//         'shhh',
//         { expiresIn: '5d' },
//         (err, token) => {
//             if (err) return res.status(401).json({ msg: 'You\'re not authenticated.' });
//             res.cookie('auth-token', token, {
//                 expires: new Date(Date.now() + 90000000),
//                 httpOnly: false,
//                 secure: false,
//                 path: "/"
//             }).json({ msg: 'You\'re logged in.' })
//         }
//     );
// };

module.exports = {
    isAuth
    // sign
};