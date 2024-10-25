import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";
import Rooms from "./rooms.js";

class Chats extends Model
{
}

Chats.init(
	{
		chat_id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		written_by: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		room_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: "Chats",
	}
)

Chats.belongsTo(Users, {foreignKey: "written_by"});
Chats.belongsTo(Rooms, {foreignKey: "room_id"});

export default Chats;