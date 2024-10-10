import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Friends from "./friends.js";

class Users extends Model
{
}

Users.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		picture: {
			type: DataTypes.STRING,
		}
	}, {
		sequelize,
		modelName: 'Users',
	}
)

Users.belongsToMany(Users, {
	through: Friends,
	as: "UsersFriends",
	foreignKey: "user_id",
	otherKey: "friend_id"
});

export default Users;