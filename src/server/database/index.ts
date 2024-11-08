import { Sequelize } from 'sequelize';
// import { configDev, configPrd } from '../config/dbconfig.ts'
import Database from '../config/dbconfig'

require("dotenv").config();

let connect: Sequelize;

const db = new Database();

if (process.env.NODE_ENV === 'production') {
    connect = new Sequelize(db.configPrd);
} else if (process.env.NODE_ENV === 'development') {
    connect = new Sequelize(db.configDev);
} else if (process.env.NODE_ENV === 'test') {
    connect = new Sequelize(db.configDev);
}else {
    throw new Error('NODE_ENV não está definido corretamente. Use "production" ou "development".');
}

export default connect;