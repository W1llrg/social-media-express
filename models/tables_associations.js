import {Model} from "sequelize";
import Users from "./users.js";
import Friends from "./friends.js";
import Comments from "./comments.js";
import Contents from "./contents.js";
import Articles from "./articles.js";
import SubscribedTo from "./subscribedTo.js";

function createAssociations() {
	Users.belongsToMany(Users, {
		through: "Friends",
		foreignKey: "user_id",
		otherKey: "friend_id"
	});
	
	SubscribedTo.belongsTo(Users, {foreignKey: "user_id"});
	SubscribedTo.belongsTo(Contents, {foreignKey: "content_id"});

	Articles.belongsTo(Users, {foreignKey: "posted_by"});
	Articles.belongsTo(Contents, {foreignKey: "part_of"});
	
	Comments.belongsTo(Users, {foreignKey: "posted_by"});
	Comments.belongsTo(Articles, {foreignKey: "on_article"});
}

export default createAssociations();