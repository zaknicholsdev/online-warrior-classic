const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const comparePasswords = async (password, databasePassword) => {
    const compare = await bcrypt.compare(password, databasePassword);
    return compare;
};

module.exports = {
    hashPassword,
    comparePasswords
};

