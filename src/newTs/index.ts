import "./common/commonStyles.css";
import { HomePage } from "./pages/homePage";

const root = document.getElementById("root");

if (root == null) {
	throw Error("Not found element with id root");
}

const pathname = window.location.pathname;
if (pathname === "/home") {
	const homePage = new HomePage();
	console.log(homePage.ref);
	root.appendChild(homePage.ref);
}
