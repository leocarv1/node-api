const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = {
    development: {
        host: process.env.DB_HOST_DEV || '',
        username: process.env.DB_USER_DEV || '',
        password: process.env.DB_PASS_DEV || '',
        database: process.env.DB_NAME_DEV || '',
        dialect: 'mysql'
    },
    // test: {
    //     host: process.env.DB_HOST_DEV || '',
    //     username: process.env.DB_USER_DEV || '',
    //     password: process.env.DB_PASS_DEV || '',
    //     database: process.env.DB_NAME_DEV || '',
    //     dialect: 'mysql'
    // },
    production: {
        host: process.env.DB_HOST_PRD || '',
        username: process.env.DB_USER_PRD || '',
        password: process.env.DB_PASS_PRD || '',
        database: process.env.DB_NAME_PRD || '',
        dialect: 'mysql'
    },
};