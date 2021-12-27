import { HTTPTransport } from "../../models/HTTPTransport";
import { TSearchPayload, TUser } from "./types";

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
}
