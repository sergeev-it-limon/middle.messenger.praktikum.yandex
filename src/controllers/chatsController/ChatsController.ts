import { HTTPTransport } from "../../models/HTTPTransport";
import { eventBus } from "../EventBus";
import { TAddChatPayload, TChat } from "./types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/chats";

export class ChatsController {
	private static instance: ChatsController | null = null;
	private http = new HTTPTransport();
	private state: TChat[] | null = null;

	constructor() {
		if (ChatsController.instance === null) {
			ChatsController.instance = this;
		}
		return ChatsController.instance;
	}

	public getState(): TChat[] | null {
		return this.state;
	}

	public async get(): Promise<void> {
		const chats = await this.http.get<TChat[]>(`${BASE_URL}`, {
			withCredentials: true,
		});
		this.state = chats;
		eventBus.emit("chatsStateUpdated", null);
	}

	public async post(payload: TAddChatPayload): Promise<void> {
		await this.http.post(`${BASE_URL}`, {
			withCredentials: true,
			data: JSON.stringify(payload),
		});

		return this.get();
	}
}
