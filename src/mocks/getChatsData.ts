import { TChatItem } from "../components/chatsList/types";
import chatsData from "./chatsData.json";

export const getChatsData = (): TChatItem[] => {
	return chatsData;
};
