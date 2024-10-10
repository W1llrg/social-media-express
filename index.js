import express from 'express'
const app = express()
const port = 3000

// DB CONFIG
import sequelize from './config/database.js'
import Users from "./models/users.js";
import Friends from "./models/friends.js";
import Comments from "./models/comments.js";
import Contents from "./models/contents.js";
import Articles from "./models/articles.js";
import SubscribedTo from "./models/subscribedTo.js";
sequelize
	.sync({force: true})
	.then(() => {
		console.log('Sequelize: Database connection established.');
	})
	.catch((error) => {
		console.error('Sequelize: Database connection failed:', error);
	});

app.get('/', (req, res) =>
{
	res.send('Hello World!')
})

app.listen(port, () =>
{
	console.log(`Example app listening on port ${port}`)
})
