const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

const users = require('./users/index');
const athletes = require('./athletes/index');
const comments = require('./comments/index');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/athletes', athletes);
app.use('/comments', comments);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err);
    res.status(statusCode).json({
        statusCode,
        type: 'error',
        message: err.message,
    });
});