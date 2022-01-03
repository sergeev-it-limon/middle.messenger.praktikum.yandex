declare module "xhr2" {
	const XMLHttpRequestMock: new () => XMLHttpRequest;
	export default XMLHttpRequestMock;
}
