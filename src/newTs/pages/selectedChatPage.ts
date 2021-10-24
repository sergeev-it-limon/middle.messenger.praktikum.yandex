import { ChatSelected } from "../components/chatSelected";
import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class SelectedChatPage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		const sidebar = new Sidebar(null);
		sidebar.build();
		return sidebar.ref;
	}
	initMainContent(): HTMLElement {
		const selectedChat = new ChatSelected(null);
		debugger
		selectedChat.build();
		return selectedChat.ref;
	}
}
