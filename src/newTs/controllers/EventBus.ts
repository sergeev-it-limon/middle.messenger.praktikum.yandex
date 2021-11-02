import { EventBus } from "../utils/buildEventBus";

type TEvents = {
	chatChanged: { chatIdNew: number };
};

export const eventBus = new EventBus<TEvents>();
