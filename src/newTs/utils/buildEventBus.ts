type TEventName<TEvents> = keyof TEvents;

type TSubscriber<TEvents, T extends TEventName<TEvents>> = (
	payload: TEvents[T]
) => void;

type TSubscribers<TEvents> = {
	[key in TEventName<TEvents>]?: TSubscriber<TEvents, key>[];
};

export class EventBus<TEvents> {
	private subscribers: TSubscribers<TEvents> = {};

	subscribe<T extends TEventName<TEvents>>(
		eventName: T,
		callback: TSubscriber<TEvents, T>
	): void {
		const subsCur = this.subscribers[eventName] as TSubscriber<TEvents, T>[];
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

	unsubscribe<T extends TEventName<TEvents>>(
		eventName: T,
		callback: TSubscriber<TEvents, T>
	): void {
		const subsCur = this.subscribers[eventName] as TSubscriber<TEvents, T>[];
		const isNotExist = subsCur.every((sub) => sub !== callback);

		if (isNotExist) {
			console.error(`callback ${callback.name} is not subscribed`);
			return;
		}

		const subsNew = subsCur.filter(
			(sub) => sub !== callback
		) as TSubscribers<TEvents>[T];

		this.subscribers[eventName] = subsNew;
	}

	emit<T extends TEventName<TEvents>>(eventName: T, payload: TEvents[T]): void {
		const subsCur = this.subscribers[eventName] as TSubscriber<TEvents, T>[];

		for (const sub of subsCur) {
			sub(payload);
		}
	}
}
