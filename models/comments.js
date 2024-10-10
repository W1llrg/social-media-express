import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";
import Articles from "./articles.js";

class Comments extends Model
{
}

Comments.init(
	{
		comment_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		posted_by: {
			type: DataTypes.INTEGER,
		},
		on_article: {
			type: DataTypes.INTEGER,
		}
	}, {
		sequelize,
		modelName: "Comments",
	}
)

Comments.belongsTo(Users, {foreignKey: "posted_by"});
Comments.belongsTo(Articles, {foreignKey: "on_article"});

export default Comments;