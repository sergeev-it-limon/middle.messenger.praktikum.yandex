import { buildEventBus } from "../utils/buildEventBus";

type TEvents = {
	chatChanged: { chatIdNew: number };
};

export const eventBus = buildEventBus<TEvents>();
