import {Sequelize} from "sequelize";
import SQLite from "sqlite3";

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'data/db.sqlite', // or ':memory:'
	dialectOptions: {
		// Your sqlite3 options here
		// for instance, this is how you can configure the database opening mode:
		mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
	},
});

export default sequelize;