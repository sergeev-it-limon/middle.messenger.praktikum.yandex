import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./list.tmpl.js";

type TListState = {
	ulClassName: string;
	liClassName: string;
};

type TListProps = TListState;

type TListBuildCtx = {
	items: HTMLElement[];
};

export class List extends BaseComponent<TListState, TListProps, TListBuildCtx> {
	render(): HTMLElement {
		const childrenKeys = this.buildContext.items.map((_, i) => `child_${i}`);
		return htmlFromStr(template({ childrenKeys }));
	}

	initChildren(): TChildren {
		const childrenEntries = this.buildContext.items.map((item, index) => {
			return [`child_${index}`, item];
		});

		const children = Object.fromEntries(childrenEntries);
		return children;
	}

	initState(): TListState {
		return {
			liClassName: this.props.liClassName,
			ulClassName: this.props.ulClassName,
		};
	}

	propsToState(): void {
		this.state.liClassName = this.props.liClassName;
		this.state.ulClassName = this.props.ulClassName;
	}
}
