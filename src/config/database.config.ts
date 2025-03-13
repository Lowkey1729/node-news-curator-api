import {Dialect} from "sequelize";

export const db = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'news_curator_api_db',
    DB_DIALECT: process.env.DB_DIALECT as Dialect || 'mysql',
}

export default db;