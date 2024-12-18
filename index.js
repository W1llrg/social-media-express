import express from 'express'
import sequelize from './config/database.js'
import loadFixtures from "./data/db_fixtures.js";
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import cors from 'cors';
import {midError} from "./middleware/midError.js";
import {GraphQLSchema} from "graphql/type/index.js";
import { graphqlHTTP } from 'express-graphql'

const app = express()
const port = 3000

const swaggerDocs = yaml.load('./swagger.yaml');

const schema = new GraphQLSchema({
	query: rootQuery
})
app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());
app.use(midError);

// ROUTES
import {userRouter} from "./routes/userRouter.js";
import {articleRouter} from "./routes/articleRouter.js";
import {commentRouter} from "./routes/commentRouter.js";
import {contentRouter} from "./routes/contentRouter.js";
import {roomRouter} from "./routes/roomsRouter.js";
import {chatRouter} from "./routes/chatRouter.js";
import {websocketServer} from "./utils/websocketServer.js";
import {rootQuery} from "./graphql/types/gqlArticlesComments.js";

app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/comment", commentRouter);
app.use("/api/content", contentRouter);
app.use("/api/room", roomRouter);
app.use("/api/chat", chatRouter);

app.listen(port, () =>
{
	console.log(`App listening on port ${port}`)
})
