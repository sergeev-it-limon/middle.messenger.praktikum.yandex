import "./common/commonStyles.css";
import { HomePage } from "./pages/homePage";
import { htmlFromStr } from "./utils/htmlFrom";

const root = document.getElementById("root");

if (root == null) {
	throw Error("Not found element with id root");
}

const pathname = window.location.pathname;
let componentNode: HTMLElement;

if (pathname === "/home") {
	componentNode = new HomePage().ref;
} else {
	componentNode = htmlFromStr("<div>Not Found</div>");
}

root.appendChild(componentNode);
