import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./inputSearch.tmpl.js";
import style from "./inputSearch.css";

type TInputSearchState = {
	className: string;
	name: string;
};
type TInputSearchProps = {
	name: string;
};

export class InputSearch extends BaseComponent<
	TInputSearchState,
	TInputSearchProps
> {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TInputSearchState {
		return {
			className: style.root,
			name: "",
		};
	}

	propsToState(): void {
		this.state.name = this.props.name;
	}
}
