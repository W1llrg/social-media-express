import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";

class Friends extends Model
{
}

Friends.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: "Users",
				key: "user_id"
			}
		},
		friend_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: "Users",
				key: "user_id"
			}
		}
	}, {
		sequelize,
		modelName: "Friends",
	}
)

export default Friends;