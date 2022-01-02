export type TUser = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
};

export type TSearchPayload = {
	login: string;
};

export type TPutProfilePayload = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type TPutPasswordPayload = {
	oldPassword: string;
	newPassword: string;
};
