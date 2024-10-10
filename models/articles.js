import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";
import Contents from "./contents.js";

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
		},
		posted_by: {
			type: DataTypes.INTEGER,
		},
		part_of: {
			type: DataTypes.INTEGER,
		}
	}, {
		sequelize,
		modelName: 'Articles',
	}
)

Articles.belongsTo(Users, {foreignKey: "posted_by"});
Articles.belongsTo(Contents, {foreignKey: "part_of"});

export default Articles;