import "../common/commonStyles.css";
import { ChatSelected } from "../components/chatSelected/ChatSelected";
import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

console.log("selectedChat");
const root = document.getElementById("root");
new ChatPageTmpl(
  {
    sidebar: {
      Component: Sidebar,
    },
    mainContent: {
      Component: ChatSelected,
    },
  },
  { parent: root }
);
