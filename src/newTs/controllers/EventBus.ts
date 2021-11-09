import { EventBus } from "../utils/buildEventBus";

type TEvents = {
	openAddUser: null;
	openRemoveUser: null;
	openRemoveChat: null;
};

export const eventBus = new EventBus<TEvents>();
