export type TAuthState = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
} | null;

export type TAuthSignup = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type TAuthSignin = {
	login: string;
	password: string;
};

export type TAuthSignupOk = {
	id: number;
};
