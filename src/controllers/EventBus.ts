import { EventBus } from "../utils/buildEventBus";

type TEvents = {
	openAddUser: null;
	openRemoveUser: null;
	openRemoveChat: null;
	editProfileStart: null;
	editProfileEnd: null;
	editPasswordStart: null;
	editPasswordEnd: null;
	openEditAvatar: null;
	closeEditAvatar: null;
	authStateUpdated: null;
};

export const eventBus = new EventBus<TEvents>();
