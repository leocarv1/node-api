import { Sequelize } from 'sequelize';
import { configDev, configPrd } from '../config/dbconfig'

require("dotenv").config();

let connect: Sequelize;

if (process.env.NODE_ENV === 'production') {
    connect = new Sequelize(configPrd);
} else if (process.env.NODE_ENV === 'development') {
    connect = new Sequelize(configDev);
} else {
    throw new Error('NODE_ENV não está definido corretamente. Use "production" ou "development".');
}

export default connect;