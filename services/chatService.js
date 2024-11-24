import Chats from "../models/chats.js";
import {MyError} from "../utils/errorBuilders.js";

const CH_CODE = 6000;

export const chatGetAll = async () =>
{
	const chats = await Chats.findAll({});
	if (!chats) {
		throw new MyError(CH_CODE, "Impossible de récupérer les chats");
	}

	return chats;
}

export const chatGetByUser = async (userId) =>
{
	const chats = await Chats.findAll({
		where: {written_by: userId}
	});
	if (!chats) {
		throw new MyError(CH_CODE + 100, "Impossible de récupérer les chats");
	}

	return chats;
}

export const chatGetByRoom = async (roomId) =>
{
	const chats = await Chats.findOne({
		where: {room_id: roomId}
	});
	if (!chats) {
		throw new MyError(CH_CODE + 200, "Impossible de récupérer les chats, room ID: " + roomId);
	}

	return chats;
}

export const chatGetById = async (chatId) =>
{
	const chat = await Chats.findOne({
		where: {chat_id: chatId}
	});
	if (!chat) {
		throw new MyError(CH_CODE + 300, "Impossible de récupérer le chat");
	}

	return chat;
}

export const chatCreate = async (userId, roomId, content) =>
{
	try {
		const chat = await Chats.create({
			written_by: userId,
			room_id: roomId,
			content: content
		});

		return true;
	} catch (e) {
		throw new MyError(CH_CODE + 400, "Impossible de créer le chat");
	}
}