import "./common/commonStyles.css";
import { AuthPage } from "./pages/authPage";
import { Error404Page } from "./pages/error404Page";
import { Error500Page } from "./pages/error500Page";
import { HomePage } from "./pages/homePage";
import { ProfilePage } from "./pages/profilePage";
import { SelectedChatPage } from "./pages/selectedChatPage";
import { SignupPage } from "./pages/signupPage";

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
} else if (pathname === "/signup") {
	const signupPage = new SignupPage(null);
	signupPage.build(null);
	componentNode = signupPage.ref;
} else if (pathname === "/500") {
	const error500Page = new Error500Page(null);
	error500Page.build(null);
	componentNode = error500Page.ref;
} else {
	const error404Page = new Error404Page(null);
	error404Page.build(null);
	componentNode = error404Page.ref;
}

root.appendChild(componentNode);
