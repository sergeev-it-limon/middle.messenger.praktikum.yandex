import { HTTPTransport } from "../../models/HTTPTransport";
import { eventBus } from "../EventBus";
import { TAddChatPayload, TAddUsersPayload, TChat } from "./types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/chats";

type TState = {
	chatList: TChat[] | null;
};

export class ChatsController {
	private static instance: ChatsController | null = null;
	private http = new HTTPTransport();
	private state: TState = { chatList: null };

	constructor() {
		if (ChatsController.instance === null) {
			ChatsController.instance = this;
		}
		return ChatsController.instance;
	}

	public getChatList(): TChat[] | null {
		return this.state.chatList;
	}

	public async get(): Promise<void> {
		const chats = await this.http.get<TChat[]>(`${BASE_URL}`, {
			withCredentials: true,
		});
		this.state.chatList = chats;
		eventBus.emit("chatListUpdated", null);
	}

	public async post(payload: TAddChatPayload): Promise<void> {
		await this.http.post(`${BASE_URL}`, {
			withCredentials: true,
			data: JSON.stringify(payload),
		});

		return this.get();
	}

	public async delete(chatId: number): Promise<void> {
		await this.http.delete(`${BASE_URL}`, {
			data: JSON.stringify({ chatId }),
			withCredentials: true,
		});
		return this.get();
	}

	public async addUsers(data: TAddUsersPayload): Promise<void> {
		return this.http.put(`${BASE_URL}/users`, {
			data: JSON.stringify(data),
			withCredentials: true,
		});
	}

	public async deleteUsers(data: TAddUsersPayload): Promise<void> {
		return this.http.delete(`${BASE_URL}/users`, {
			data: JSON.stringify(data),
			withCredentials: true,
		});
	}
}
