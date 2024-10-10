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
import loadFixtures from "./data/db_fixtures.js";

sequelize
	.sync({force: true})
	.then(() => {
		console.log('Sequelize: Database connection established.');
		loadFixtures().then(r => console.log(r));
	})
	.catch((error) => {
		console.error('Sequelize: Database connection failed:', error);
	});

import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerDocs = yaml.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) =>
{
	res.send('Hello World!')
})

app.listen(port, () =>
{
	console.log(`Example app listening on port ${port}`)
})
