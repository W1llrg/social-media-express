import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

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
		}
	}, {
		sequelize,
		modelName: "Comments",
	}
)