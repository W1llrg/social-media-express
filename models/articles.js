import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

class Articles extends Model
{
}

Articles.init(
	{
		article_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	}, {
		sequelize,
		modelName: 'Articles',
	}
)