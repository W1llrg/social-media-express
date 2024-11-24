import {Server} from 'socket.io';

class WebsocketServer
{
	rooms = ["default"];
	instance = null;
	io = null;

	constructor(port)
	{
		if (WebsocketServer.instance) {
			return WebsocketServer.instance;
		}

		this.io = new Server(port, {
			cors: { origin: '*' }
		});

		this.init();
		console.log(`Websocket server listening on port ${port}`);

		WebsocketServer.instance = this;
	}

	init()
	{
		for (let room of this.rooms) {
			this.io.of(room).on("connection", (socket) => {
				this.messageHandler(socket, room);

				console.log(`new room opened: ${room}`);
			});
		}
	}

	messageHandler(socket, room)
	{
		socket.on("message", (message) =>
		{
			console.log(`Received ${message} in room ${room}`);

			this.of(room).emit("message", message);
		});
	}

	openRoom()
	{
		const room = `room-${this.rooms.length + 1}`;
		this.rooms.push(room);

		this.io.of(room).on("connection", (socket) => {
			this.messageHandler(socket, room);

			console.log(`new room opened: ${room}`);
		});

		return room;
	}
}

export const websocketServer = new WebsocketServer(2999);