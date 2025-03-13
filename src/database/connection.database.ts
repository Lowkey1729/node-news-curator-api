import db from "@app/config/database.config";
import {Sequelize} from 'sequelize-typescript'
import path from "path";

const sequelize = new Sequelize(
    db.DB_NAME,
    db.DB_USER,
    db.DB_PASSWORD,
    {
        host: db.DB_HOST,
        dialect: db.DB_DIALECT,
        models: [path.join(__dirname, '../models/**/*.model.ts')],
        logging: false
    }
)

const connection = () => {
    sequelize.authenticate()
        .then(() => {
            console.log("db connected successfully!.");
        })
        .catch(err => {
            console.error(err);
        })
}

connection();