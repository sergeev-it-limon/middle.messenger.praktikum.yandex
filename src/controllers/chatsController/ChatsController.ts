import { HTTPTransport } from "../../models/HTTPTransport";
import { eventBus } from "../EventBus";
import {
	TAddChatPayload,
	TAddUsersPayload,
	TChat,
	TChatCur,
	TMessage,
	TTokenResponce,
} from "./types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/chats";
const WS_URL = "wss://ya-praktikum.tech/ws/chats";

type TState = {
	chatList: TChat[] | null;
	chatCur: TChatCur;
};

type THandlers = {
	[key in string]: (...args: unknown[]) => unknown;
};

export class ChatsController {
	private static instance: ChatsController | null = null;
	private http = new HTTPTransport();
	private state: TState = {
		chatList: null,
		chatCur: {
			messages: [],
			socket: null,
			token: null,
			socketPingDescr: -1,
		},
	};
	private handlers: THandlers = {
		"get old": (event: MessageEvent<string>) => {
			const data = JSON.parse(event.data);
			this.addMessages(data);
		},
		pong: () => {
			if (this.state.chatCur.socketPingDescr !== null) {
				clearTimeout(this.state.chatCur.socketPingDescr);
			}

			this.state.chatCur.socketPingDescr = setTimeout(
				this.pingWs.bind(this),
				5000
			);
		},
		message: (event: MessageEvent<string>) => {
			const data = JSON.parse(event.data);
			this.addMessages([data]);
		},
	};

	constructor() {
		if (ChatsController.instance === null) {
			ChatsController.instance = this;
		}

		for (const [key, handler] of Object.entries(this.handlers)) {
			this.handlers[key as keyof typeof this.handlers] = handler.bind(this);
		}

		return ChatsController.instance;
	}

	private addMessages(data: TMessage[]) {
		this.state.chatCur.messages.push(...data);
		eventBus.emit("messageReceived", null);
	}

	public getChatList(): TChat[] | null {
		return this.state.chatList;
	}

	public getMessages(): TMessage[] {
		return this.state.chatCur.messages;
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

	public async fetchToken(chatId: number): Promise<void> {
		if (this.state.chatCur.token !== null) {
			this.state.chatCur.token = null;
		}

		const token = await this.http.post<TTokenResponce>(
			`${BASE_URL}/token/${chatId}`,
			{ withCredentials: true }
		);

		this.state.chatCur.token = token.token;
	}

	public async initWs(userId: number, chatId: number): Promise<void> {
		return new Promise((resolve) => {
			if (this.state.chatCur.socket !== null) {
				this.state.chatCur.socket.close();
			}

			this.state.chatCur.socket = new WebSocket(
				`${WS_URL}/${userId}/${chatId}/${this.state.chatCur.token}`
			);

			this.state.chatCur.socket.addEventListener(
				"message",
				(event: MessageEvent<string>) => {
					const result = JSON.parse(event.data);
					if (result instanceof Array) {
						this.handlers["get old"](event);
					} else {
						const { type } = result;
						const handler = this.handlers[type];

						if (typeof handler === "function") handler(event);
					}
				}
			);

			this.state.chatCur.socket.addEventListener("open", () => resolve());
		});
	}

	public async initWsConnection(userId: number, chatId: number): Promise<void> {
		await this.fetchToken(chatId);
		await this.initWs(userId, chatId);
		return this.pingWs();
	}

	public async pingWs(): Promise<void> {
		if (this.state.chatCur.socket === null) return;

		this.state.chatCur.socket.send(
			JSON.stringify({
				type: "ping",
			})
		);
	}

	public sendMessage(content: string): void {
		if (this.state.chatCur.socket === null) return;

		this.state.chatCur.socket.send(
			JSON.stringify({
				content,
				type: "message",
			})
		);
	}

	public async fetchAllMessages(): Promise<void> {
		if (this.state.chatCur.socket === null) return;
		this.state.chatCur.messages = [];
		this.state.chatCur.socket.send(
			JSON.stringify({
				content: "0",
				type: "get old",
			})
		);
	}
}
