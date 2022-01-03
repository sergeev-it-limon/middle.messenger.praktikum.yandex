import { DOMWindow, JSDOM } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";
import { Router } from "./Router";

const getComponentOne = () => {
	const div = document.createElement("div");
	div.setAttribute("data-test-id", "testComponentOne");
	return div;
};

const selectComponentOne = () => {
	return document.querySelector('[data-test-id="testComponentOne"]');
};

const getComponentTwo = () => {
	const div = document.createElement("div");
	div.setAttribute("data-test-id", "testComponentTwo");
	return div;
};

describe("Router", () => {
	beforeEach(() => {
		const dom = new JSDOM('<div id="app"></div>', {
			url: "http://localhost:3000",
		});

		global.document = dom.window.document;
		(global.window as unknown as DOMWindow) = dom.window;

		new Router("#app").destruct();
	});

	it("should be sigletone", () => {
		const router = new Router("#app");

		expect(new Router("#app")).to.eq(router);
	});

	describe(".use", () => {
		it("should return Router instance", () => {
			const router = new Router("#app");

			const result = router.use("/page", getComponentOne);

			expect(result).to.eq(router);
		});
	});

	describe(".start", () => {
		it("should render current page", () => {
			const router = new Router("#app");

			router.use("/", getComponentOne).start();

			expect(selectComponentOne()).not.to.be.null;
		});
	});

	describe(".go", () => {
		it("should render new component", () => {
			const router = new Router("#app");

			router.use("/page", getComponentOne).go("/page");

			expect(selectComponentOne()).not.to.be.null;
		});
		it("sould remove previous component", () => {
			const router = new Router("#app");

			router.use("/", getComponentOne).use("/page", getComponentTwo).start();
			router.go("/page");

			expect(selectComponentOne()).to.be.null;
		});
	});

	describe(".back", () => {
		it("should call history.back", () => {
			const router = new Router("#app");
			const sandbox = sinon.createSandbox();
			const spy = sandbox.spy(window.history, "back");

			router.back();

			expect(spy.calledOnce).to.be.true;
		});
	});

	describe(".forward", () => {
		it("should call history.forward", () => {
			const router = new Router("#app");
			const sandbox = sinon.createSandbox();
			const spy = sandbox.spy(window.history, "forward");

			router.forward();

			expect(spy.calledOnce).to.be.true;
		});
	});
});
