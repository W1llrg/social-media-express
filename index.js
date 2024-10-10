import express from 'express'
import sequelize from './config/database.js'
import loadFixtures from "./data/db_fixtures.js";
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';

const app = express()
const port = 3000

const swaggerDocs = yaml.load('./swagger.yaml');

// DB CONFIG
sequelize
	.sync({force: true})
	.then(() => {
		console.log('Sequelize: Database connection established.');
		loadFixtures().then(r => console.log(r));
	})
	.catch((error) => {
		console.error('Sequelize: Database connection failed:', error);
	});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

// ROUTES
import { userRouter } from "./routes/userRouter.js";

app.use("/api/user", userRouter);

app.listen(port, () =>
{
	console.log(`Example app listening on port ${port}`)
})
