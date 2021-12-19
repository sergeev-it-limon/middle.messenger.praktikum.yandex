export enum METHODS {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

type TOptionsInternal<TData> = {
	method: METHODS;
	headers?: { [key: string]: string };
	data?: TData;
};

type TOptions<TData> = Omit<TOptionsInternal<TData>, "method"> & {
	timeout?: number;
};

type TRequest = <TDataRes, TDataReq extends XMLHttpRequestBodyInit>(
	url: string,
	options?: TOptions<TDataReq>
) => Promise<TDataRes>;

export class HTTPTransport {
	get: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	};

	post: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	put: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};

	delete: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	request = <TDataRes, TDataReq extends XMLHttpRequestBodyInit>(
		url: string,
		options: TOptionsInternal<TDataReq>,
		timeout = 5000
	): Promise<TDataRes> => {
		const { headers = {}, method, data } = options ?? {};

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject("No method");
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGet = method === METHODS.GET;

			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			if (headers["Content-type"] === undefined) {
				xhr.setRequestHeader("Content-type", "application/json");
			}

			xhr.onload = function () {
				resolve(xhr.response);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGet || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

function queryStringify<TData>(data: TData): string {
	if (typeof data !== "object") {
		throw new Error("Data must be object");
	}

	const entries = Object.entries(data);

	const query = entries.reduce((acc, entry, index) => {
		const [key, value] = entry;

		let result = acc;

		if (index !== 0) {
			result = `${result}&`;
		}

		return `${result}${key}=${value}`;
	}, "?");

	return query;
}
