import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const config: MysqlConnectionOptions = {
  type: 'mariadb',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: false,
  // migrations: ['dist/src/db/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
};

export default config;
