import Rooms from "../models/rooms.js";
import {MyError} from "../utils/errorBuilders.js";
import {websocketServer} from "../utils/websocketServer.js";

const RM_CODE = 5000;

export const roomGetAll = async () =>
{
	const rooms = await Rooms.findAll({});
	if (!rooms) {
		throw new MyError(RM_CODE, "Impossible de récupérer les rooms");
	}

	return rooms;
}

export const roomGetByUser = async (userId) =>
{
	const room = await Rooms.findAll({
		where: {user_id: userId}
	});
	if (!room) {
		throw new MyError(RM_CODE + 100, "Impossible de récupérer la room");
	}

	return room;
}

export const roomGetById = async (roomId) =>
{
	const room = await Rooms.findOne({
		where: {room_id: roomId}
	});
	if (!room) {
		throw new MyError(RM_CODE + 200, "Impossible de récupérer la room, ID: " + roomId);
	}

	return room;
}

export const roomGetByUserCombo = async (userId, friendId) =>
{
	let room = await Rooms.findOne({
		where: {
			user_id: userId,
			friend_id: friendId
		}
	});

	if (!room) {
		room = false;
	}
	return room;
}

export const roomFindOrCreate = async (userId, friendId) =>
{
	try {
		const room = await roomGetByUserCombo(userId, friendId);

		if (room) {
			return room.room_name;
		}
	} catch (e) {
		console.error(e);
	}

	try {
		const roomName = websocketServer.openRoom();
		const room = await Rooms.create({
			user_id: userId,
			friend_id: friendId,
			room_name: roomName
		});

		console.log(room);

		return roomName;
	} catch (e) {
		throw new MyError(RM_CODE + 410, "Impossible de créer la room: " + e);
	}
}

export const roomDelete = async (userId, friendId) =>
{
	try {
		const room = await Rooms.destroy({
			where: {
				user_id: userId,
				friend_id: friendId
			}
		});

		return true;
	} catch (e) {
		throw new MyError(RM_CODE + 500, "Impossible de supprimer la room`")
	}
}

export const roomDeleteById = async (roomId) =>
{
	// TODO - get room name
	try {
		const room = await Rooms.destroy({
			where: {
				room_id: roomId
			}
		});

		// const roomName = websocketServer.closeRoom(roomName);
		return true;
	} catch (e) {
		throw new MyError(RM_CODE + 600, "Impossible de supprimer la room`")
	}
}
