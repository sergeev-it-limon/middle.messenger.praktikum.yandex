import { expect } from "chai";
import sinon from "sinon";
import XMLHttpRequest from "xhr2";
import nock from "nock";
import { HTTPTransport } from "./HTTPTransport";
import { JSDOM } from "jsdom";

describe("HTTPTransport", () => {
	let http: HTTPTransport;
	const nockScope = nock("http://test.com");
	const sandbox = sinon.createSandbox();

	beforeEach(() => {
		(global.XMLHttpRequest as new () => XMLHttpRequest) = XMLHttpRequest;
		http = new HTTPTransport();
		
		const dom = new JSDOM('<div id="app"></div>', {
			url: "http://localhost:3000",
		});

		global.FormData = dom.window.FormData;
	});

	afterEach(() => {
		sandbox.restore();
		nockScope.removeAllListeners();
	});

	describe(".get", () => {
		it("should set get method for http request", async () => {
			nockScope.get("/").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "open");

			await http.get("http://test.com/");

			expect(spy.args[0][0]).to.be.eq("GET");
		});

		it("should convert data-object to query", async () => {
			nockScope.get("/?keyOne=1&keyTwo=two").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "open");
			const data = {
				keyOne: 1,
				keyTwo: "two",
			};

			await http.get("http://test.com", { data: JSON.stringify(data) });

			expect(spy.args[0][1]).to.be.eq("http://test.com?keyOne=1&keyTwo=two");
		});
	});

	describe(".post", () => {
		it("should set post method for http request", async () => {
			nockScope.post("/").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "open");

			await http.post("http://test.com/");

			expect(spy.args[0][0]).to.be.eq("POST");
		});
		it("should send data", async () => {
			nockScope.post("/").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "send");
			const data = JSON.stringify({ foo: "bar", bar: ["baz", "bzz"] });

			await http.post("http://test.com/", { data });

			expect(spy.args[0][0]).to.be.eq(data);
		});
	});

	describe(".put", () => {
		it("should set put method for http request", async () => {
			nockScope.put("/").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "open");

			await http.put("http://test.com/");

			expect(spy.args[0][0]).to.be.eq("PUT");
		});
	});

	describe(".delete", () => {
		it("should set delete for http request", async () => {
			nockScope.delete("/").reply(200, "OK");
			const spy = sandbox.spy(XMLHttpRequest.prototype, "open");

			await http.delete("http://test.com/");

			expect(spy.args[0][0]).to.be.eq("DELETE");
		});
	});
});
