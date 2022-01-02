import { HTTPTransport } from "../../models/HTTPTransport";
import {
	TPutPasswordPayload,
	TPutProfilePayload,
	TSearchPayload,
	TUser,
} from "./types";

const BASE_URL = "https://ya-praktikum.tech/api/v2/user";

export class UsersController {
	private static instance: UsersController | null = null;
	private http = new HTTPTransport();

	constructor() {
		if (UsersController.instance === null) {
			UsersController.instance = this;
		}
		return UsersController.instance;
	}

	public async search(data: TSearchPayload): Promise<TUser[] | null> {
		return this.http.post(`${BASE_URL}/search`, {
			data: JSON.stringify(data),
			withCredentials: true,
		});
	}

	public async putProfile(data: TPutProfilePayload): Promise<void> {
		return this.http.put(`${BASE_URL}/profile`, {
			data: JSON.stringify(data),
			withCredentials: true,
		});
	}

	public async putAvatar(data: FormData): Promise<void> {
		return this.http.put(`${BASE_URL}/profile`, {
			data,
			withCredentials: true,
		});
	}

	public async putPassword(data: TPutPasswordPayload): Promise<void> {
		return this.http.put(`${BASE_URL}/password`, {
			data: JSON.stringify(data),
			withCredentials: true,
		});
	}
}
