import { ChatSelected } from "../components/chatSelected";
import { ModalAddRemoveUser } from "../components/modalAddRemoveUser";
import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class SelectedChatPage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		const sidebar = new Sidebar(null);
		sidebar.build(null);
		return sidebar.ref;
	}

	initMainContent(): HTMLElement {
		const selectedChat = new ChatSelected(null);
		selectedChat.build({ messages: [] });
		return selectedChat.ref;
	}

	initAddUserModal(): HTMLElement {
		const addRemoveUserModal = new ModalAddRemoveUser({ typeModal: "add" });
		addRemoveUserModal.build(null);

		return addRemoveUserModal.ref;
	}
	initRemoveUserModal(): HTMLElement {
		const addRemoveUserModal = new ModalAddRemoveUser({ typeModal: "remove" });
		addRemoveUserModal.build(null);

		return addRemoveUserModal.ref;
	}
}
