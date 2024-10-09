import express from 'express'
const app = express()
const port = 3000

// DB CONFIG
import sequelize from './config/database.js'
import Users from './models/users.js'
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
