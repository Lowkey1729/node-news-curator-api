import db from "@app/config/database.config";
import {Sequelize} from 'sequelize-typescript'
import path from "path";
import {logger} from "@app/config/logger.config";

const sequelize = new Sequelize(
    db.db_name,
    db.db_user,
    db.db_password,
    {
        host: db.db_host,
        dialect: db.db_dialect,
        models: [path.join(__dirname, '../models/**/*.model.ts')],
        logging: false
    }
)

const connection = () => {
    sequelize.authenticate()
        .then(() => {
            logger.info('🚀🚀 %s db connected successfully!', db.db_dialect)
        })
        .catch(err => {
            console.error(err);
        })
}

connection();