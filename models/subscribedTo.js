import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

class SubscribedTo extends Model
{
}

SubscribedTo.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		content_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		}
	}, {
		sequelize,
		modelName: "SubscribedTo",
	}
)