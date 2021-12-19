export type TMessageType = "message" | "image";

export type TMessage = {
	id: number;
	type: TMessageType;
	content: {
		text?: string;
		src?: string;
		time: number;
		timeRangeDay: number;
	};
	isMy: boolean;
};

export type TMessagesByDay = {
	timeDay: number;
	messages: TMessage[];
};
