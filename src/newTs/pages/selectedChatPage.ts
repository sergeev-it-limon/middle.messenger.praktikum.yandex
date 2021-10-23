import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class SelectedChatPage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		const sidebar = new Sidebar(null);
		sidebar.build();
		return sidebar.ref;
	}
	initMainContent(): HTMLElement {
		const div = document.createElement("div");
		div.innerText = "MainContent";
		return div;
	}
}
