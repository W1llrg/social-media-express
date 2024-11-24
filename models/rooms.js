import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";

class Rooms extends Model
{
}

Rooms.init(
	{
		room_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		friend_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		room_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
	}, {
		sequelize,
		modelName: "Rooms",
	}
)

Rooms.belongsTo(Users, {foreignKey: "user_id"});
Rooms.belongsTo(Users, {foreignKey: "friend_id"});

export default Rooms;