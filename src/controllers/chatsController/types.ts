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
