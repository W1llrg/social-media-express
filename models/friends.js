import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

class Friends extends Model
{
}

Friends.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		friend_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		}
	}, {
		sequelize,
		modelName: "Friends",
	}
)