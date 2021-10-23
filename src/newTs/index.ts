import "./common/commonStyles.css";
import { HomePage } from "./pages/homePage";
// import { htmlFromStr } from "./utils/htmlFrom";

const root = document.getElementById("root");

if (root == null) {
	throw Error("Not found element with id root");
}

// const pathname = window.location.pathname;
// let componentNode: HTMLElement;

const homePage = new HomePage(null);
homePage.build();
const componentNode = homePage.ref;
// if (pathname === "/home") {
// } else {
// 	componentNode = htmlFromStr("<div>Not Found</div>");
// }

root.appendChild(componentNode);
