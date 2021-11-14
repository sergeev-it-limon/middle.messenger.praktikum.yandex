import "./common/commonStyles.css";
import { AuthPage } from "./pages/authPage";
import { HomePage } from "./pages/homePage";
import { ProfilePage } from "./pages/profilePage";
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
	homePage.build(null);
	componentNode = homePage.ref;
} else if (/^\/selectedChat\/\d+$/.test(pathname)) {
	const selectedChatPage = new SelectedChatPage(null);
	selectedChatPage.build(null);
	componentNode = selectedChatPage.ref;
} else if (pathname === "/") {
	const authPage = new AuthPage(null);
	authPage.build(null);
	componentNode = authPage.ref;
} else if (pathname === "/profile") {
	const profilePage = new ProfilePage(null);
	profilePage.build(null);
	componentNode = profilePage.ref;
} else {
	componentNode = htmlFromStr("<div>Not Found</div>");
}

root.appendChild(componentNode);
