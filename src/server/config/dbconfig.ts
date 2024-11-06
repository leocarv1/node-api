import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface DatabaseConfig {
    dialect: 'mysql';
    host: string;
    username: string;
    password: string;
    database: string;
    define: {
        timestamps: boolean;
        underscored: boolean;
    };
}

class DataBase {
    public configPrd: DatabaseConfig = {
        dialect: 'mysql',
        host: process.env.DB_HOST_PRD || '',
        username: process.env.DB_USER_PRD || '',
        password: process.env.DB_PASS_PRD || '',
        database: process.env.DB_NAME_PRD || '',
        define: {
            timestamps: true,
            underscored: true,
        }
    };
    
    public configDev: DatabaseConfig = {
        dialect: 'mysql',
        host: process.env.DB_HOST_DEV || '',
        username: process.env.DB_USER_DEV || '',
        password: process.env.DB_PASS_DEV || '',
        database: process.env.DB_NAME_DEV || '',
        define: {
            timestamps: true,
            underscored: true,
        }
    };
}

// export default { configDev, configPrd };
// module.exports = { configDev, configPrd };
export default  DataBase
