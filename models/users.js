import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";

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

export default Users;