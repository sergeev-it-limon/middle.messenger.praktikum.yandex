import { HTTPTransport } from "../../models/HTTPTransport";
import { eventBus } from "../EventBus";
import { TAuthSignin, TAuthSignup, TAuthSignupOk, TAuthState } from "./types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/auth";

export class AuthController {
	private static instance: AuthController | null = null;
	private state: TAuthState | null = null;

	constructor() {
		if (AuthController.instance === null) {
			AuthController.instance = this;
		}
		return AuthController.instance;
	}

	public getState(): TAuthState {
		return this.state;
	}

	public async signup(user: TAuthSignup): Promise<TAuthSignupOk> {
		const http = new HTTPTransport();
		return http.post<TAuthSignupOk>(`${BASE_URL}/signup`, {
			data: JSON.stringify(user),
			withCredentials: true,
		});
	}

	public async signin(user: TAuthSignin): Promise<void> {
		const http = new HTTPTransport();
		return http.post(`${BASE_URL}/signin`, {
			data: JSON.stringify(user),
			withCredentials: true,
		});
	}

	public async get(): Promise<void> {
		const http = new HTTPTransport();
		const user = await http.get<TAuthState>(`${BASE_URL}/user`, {
			withCredentials: true,
		});
		this.state = user;
		eventBus.emit("authStateUpdated", null);
	}
}
