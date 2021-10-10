import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class HomePage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		return new Sidebar().ref;
	}
	initMainContent(): HTMLElement {
		const div = document.createElement("div");
		div.innerText = "MainContent";
		return div;
	}
}
