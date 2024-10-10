import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database.js";
import Users from "./users.js";
import Contents from "./contents.js";

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

SubscribedTo.belongsTo(Users, {foreignKey: "user_id"});
SubscribedTo.belongsTo(Contents, {foreignKey: "content_id"});

export default SubscribedTo;