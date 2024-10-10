import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";

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
		},
		created_by: {
			type: DataTypes.INTEGER,
		}
	}, {
		sequelize,
		modelName: "Contents",
	}
)

Contents.belongsTo(Users, {foreignKey: "created_by"});

export default Contents;