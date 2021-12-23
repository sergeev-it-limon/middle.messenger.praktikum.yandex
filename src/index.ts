import "./common/commonStyles.css";
import { Router } from "./controllers/Router";
import { AuthPage } from "./pages/authPage";
import { Error404Page } from "./pages/error404Page";
import { Error500Page } from "./pages/error500Page";
import { HomePage } from "./pages/homePage";
import { ProfilePage } from "./pages/profilePage";
import { SelectedChatPage } from "./pages/selectedChatPage";
import { SignupPage } from "./pages/signupPage";
import { buildGetComponent } from "./utils/buildgetComponent";

const router = new Router("#root");
router
	.use("/messenger", buildGetComponent(new HomePage(null)))
	.use("/messenger/:chatId", buildGetComponent(new SelectedChatPage(null)))
	.use("/settings", buildGetComponent(new ProfilePage(null)))
	.use("/500", buildGetComponent(new Error500Page(null)))
	.use("/sign-up", buildGetComponent(new SignupPage(null)))
	.use("/", buildGetComponent(new AuthPage(null)))
	.use("*", buildGetComponent(new Error404Page(null)))
	.start();
