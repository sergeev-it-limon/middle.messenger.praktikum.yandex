export type TStateBase = { [key: string]: string | number } | null;

type TEvents<TState extends TStateBase> = {
	[key in keyof TState]: TState[key];
};

type TEventName<TState extends TStateBase> = keyof TEvents<TState>;

type TSubscriber<TState extends TStateBase, T extends TEventName<TState>> = (
	payload: TEvents<TState>[T]
) => void;

type TSubscribers<TState extends TStateBase> = {
	[key in TEventName<TState>]?: TSubscriber<TState, key>[];
};

export class StateChangeEventBus<TState extends TStateBase> {
	private subscribers: TSubscribers<TState> = {};

	subscribe<T extends TEventName<TState>>(
		eventName: T,
		callback: TSubscriber<TState, T>
	): void {
		const subsCur = this.subscribers[eventName];
		const isExist = subsCur?.some((sub) => sub === callback) ?? false;

		if (isExist) {
			console.error(`callback ${callback.name} already subscribed`);
			return;
		}

		if (subsCur == null) {
			this.subscribers[eventName] = [callback];
		} else {
			subsCur.push(callback);
		}
	}

	unsubscribe<T extends TEventName<TState>>(
		eventName: T,
		callback: TSubscriber<TState, T>
	): void {
		const subsCur = this.subscribers[eventName];
		const isNotExist = subsCur?.every((sub) => sub !== callback);

		if (isNotExist) {
			console.error(`callback ${callback.name} is not subscribed`);
			return;
		}

		const subsNew = subsCur?.filter((sub) => sub !== callback);

		this.subscribers[eventName] = subsNew;
	}

	emit<T extends TEventName<TState>>(
		eventName: T,
		payload: TEvents<TState>[T]
	): void {
		const subsCur = this.subscribers[eventName] as TSubscriber<TState, T>[];

		for (const sub of subsCur) {
			sub(payload);
		}
	}
}
