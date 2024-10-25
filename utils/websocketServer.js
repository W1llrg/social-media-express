import {Server} from 'socket.io';

export class WebsocketServer extends Server
{
	let
	rooms = ["default"];

	constructor(port)
	{
		super(port, {
				cors: {origin: '*'}
			}
		);
		this.init();
	}

	init()
	{
		for (let room of this.rooms) {
			this.of(room).on("connection", (socket) => {
				this.messageHandler(socket, room);

				console.log(`new room opened: ${room}`);
			});
		}
	}

	messageHandler(socket, room)
	{
		socket.on("message", (message) =>
		{
			console.log(`Received ${message}`);

			this.of(room).emit("message", message);
		});
	}

	openRoom()
	{
		const room = `room-${this.rooms.length + 1}`;
		this.rooms.push(room);

		this.of(room).on("connection", (socket) => {
			this.messageHandler(socket, room);

			console.log(`new room opened: ${room}`);
		});
	}
}