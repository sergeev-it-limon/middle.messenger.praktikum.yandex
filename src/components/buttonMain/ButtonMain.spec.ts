import { DOMWindow, JSDOM } from "jsdom";
import { expect } from "chai";
import sinon from "sinon";
import { ButtonMain } from "./ButtonMain";

describe("ButtonMain", () => {
	const sandbox = sinon.createSandbox();

	beforeEach(() => {
		const dom = new JSDOM('<div id="app"></div>', {
			url: "http://localhost:3000",
		});

		global.document = dom.window.document;
		global.HTMLElement = dom.window.HTMLElement;
		global.Node = dom.window.Node;
		global.Event = dom.window.Event;
		(global.window as unknown as DOMWindow) = dom.window;
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe(".build", () => {
		it("should render text in button", () => {
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build(null);

			expect(buttonMain.ref.innerText).to.be.eq("testButton");
		});

		it("should connect listener to component", () => {
			const handleClick = sandbox.spy(() => {});
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build({ handleClick });
			const event = new Event("click");
			buttonMain.ref.dispatchEvent(event);

			expect(handleClick.calledOnce).to.be.true;
		});

		it("should call new listener", () => {
			const handleClick = sandbox.spy(() => {});
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build({ handleClick: () => {} });
			buttonMain.build({ handleClick });
			const event = new Event("click");
			buttonMain.ref.dispatchEvent(event);

			expect(handleClick.calledOnce).to.be.true;
		});

		it("should replace old listener", () => {
			const handleClick = sandbox.spy(() => {});
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build({ handleClick });
			buttonMain.build({ handleClick: () => {} });
			const event = new Event("click");
			buttonMain.ref.dispatchEvent(event);

			expect(handleClick.called).not.to.be.true;
		});
	});
	describe(".hide", () => {
		it("should set display: none on component", () => {
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build(null);
			buttonMain.hide();

			expect(buttonMain.ref.style.display).to.be.eq("none");
		});
	});
	describe(".show", () => {
		it("should remove display: none from component", () => {
			const buttonMain = new ButtonMain({ text: "testButton" });

			buttonMain.build(null);
			buttonMain.hide();
			buttonMain.show();

			expect(buttonMain.ref.style.display).not.to.be.eq("none");
		});
	});
	describe(".update", () => {
		it("should update component state", () => {
			const textButtonTwo = "textButtonTwo";
			const buttonMain = new ButtonMain({ text: "testButtonOne" });

			buttonMain.build(null);
			buttonMain.update({ text: textButtonTwo });

			expect(buttonMain.ref.innerText).to.be.eq(textButtonTwo);
		});
	});
});
