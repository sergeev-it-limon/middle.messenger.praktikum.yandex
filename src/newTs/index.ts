import "./common/commonStyles.css";
import { HomePage } from "./pages/homePage";
import { SelectedChatPage } from "./pages/selectedChatPage";
import { htmlFromStr } from "./utils/htmlFrom";

const root = document.getElementById("root");

if (root == null) {
	throw Error("Not found element with id root");
}

const pathname = window.location.pathname;
let componentNode: HTMLElement;

if (pathname === "/home") {
	const homePage = new HomePage(null);
	homePage.build();
	componentNode = homePage.ref;
} else if (/^\/selectedChat\/\d+$/.test(pathname)) {
	const selectedChatPage = new SelectedChatPage(null);
	selectedChatPage.build();
	componentNode = selectedChatPage.ref;
} else {
	componentNode = htmlFromStr("<div>Not Found</div>");
}

root.appendChild(componentNode);
