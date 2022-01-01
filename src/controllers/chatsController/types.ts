export type TChat = {
	id: number;
	title: string;
	avatar?: string;
	unread_count: number;
	last_message?: {
		user: {
			first_name: string;
			second_name: string;
			avatar: string;
			email: string;
			login: string;
			phone: string;
		};
		time: string;
		content: string;
	};
};

export type TAddChatPayload = {
	title: string;
};

export type TAddUsersPayload = {
	users: number[];
	chatId: number;
};

export type TTokenResponce = { token: string };

export type TMessage = {
	chat_id: number;
	time: string;
	user_id: number;
	content: string;
};

export type TChatCur = {
	token: string | null;
	socket: WebSocket | null;
	messages: TMessage[];
	socketPingDescr: number | null;
};
