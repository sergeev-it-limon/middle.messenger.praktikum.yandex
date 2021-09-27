import "../common/commonStyles.css";
import { ChatStub } from "../components/chatStub";
import { Sidebar } from "../components/sidebar";
import { ChatPageTmpl } from "../templates/chatPageTmpl";

const root = document.getElementById("root");
new ChatPageTmpl(
  {
    sidebar: {
      Component: Sidebar,
    },
    mainContent: {
      Component: ChatStub,
    },
  },
  { parent: root }
);
