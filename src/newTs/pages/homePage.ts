import { ChatStub } from "../components/chatStub";
import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class HomePage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		const sidebar = new Sidebar(null);
		sidebar.build(null);
		return sidebar.ref;
	}

	initMainContent(): HTMLElement {
		const chatStub = new ChatStub(null);
		chatStub.build(null);
		return chatStub.ref;
	}

	initAddUserModal(): HTMLElement {
		return document.createElement("div");
	}
	
	initRemoveUserModal(): HTMLElement {
		return document.createElement("div");
	}
}
