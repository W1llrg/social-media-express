import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

class Contents extends Model
{
}

Contents.init(
	{
		content_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: "Contents",
	}
)