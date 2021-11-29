import { EventBus } from "../../utils/buildEventBus";

export type TStateBase = { [key: string]: string | number };

export class StateChangeEventBus extends EventBus<TStateBase> {}
