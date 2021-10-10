type TEvents = {
	auth: { userName: string };
	mesagesResived: { text: string }[];
};

type TEventName = keyof TEvents;

type TSubscriber<T extends TEventName> = (payload: TEvents[T]) => void;

type TSubscribers = { [key in TEventName]: TSubscriber<key>[] };

export default class EventBus {
	private subscribers: TSubscribers;

	subscribe<T extends TEventName>(eventName: T, callback: TSubscriber<T>) {
		const subsCur = this.subscribers[eventName] as TSubscriber<T>[];
		const isExist = subsCur.some((sub) => sub === callback);

		if (isExist) {
			console.error(`callback ${callback.name} already subscribed`);
			return;
		}

		subsCur.push(callback);
	}

	unsubscribe<T extends TEventName>(eventName: T, callback: TSubscriber<T>) {
		const subsCur = this.subscribers[eventName] as TSubscriber<T>[];
		const isNotExist = subsCur.every((sub) => sub !== callback);

		if (isNotExist) {
			console.error(`callback ${callback.name} is not subscribed`);
			return;
		}

		const subsNew = subsCur.filter(
			(sub) => sub !== callback
		) as TSubscribers[T];

		this.subscribers[eventName] = subsNew;
	}

	emit<T extends TEventName>(eventName: T, payload: TEvents[T]) {
		const subsCur = this.subscribers[eventName] as TSubscriber<T>[];

		for (let sub of subsCur) {
			sub(payload);
		}
	}
}

export const eventBus = new EventBus();
