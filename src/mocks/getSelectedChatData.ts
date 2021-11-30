import { TMessagesByDay } from "../components/chatSelected/chatSelectedTypes";
import { data } from "./selectedChatData";

export const getSelectedChatData = (): TMessagesByDay[] => {
	return data as TMessagesByDay[];
};
