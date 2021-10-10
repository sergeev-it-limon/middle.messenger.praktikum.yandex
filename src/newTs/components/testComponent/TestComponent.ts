import { BaseComponent } from "../baseComponent";
import { TActions } from "../baseComponent/ActionsService";
import { TChildren } from "../baseComponent/ChildrenService";

type TState = { title: string };

export class TestComponent extends BaseComponent<TState> {
	render(state: TState): HTMLElement {
		const h1 = document.createElement("h1");
		h1.setAttribute("data-value-used", "title");
		h1.innerText = state.title;

		return h1;
	}

	initChildren(): TChildren {
		return {};
	}

	initActions(): TActions {
		return {};
	}
}
