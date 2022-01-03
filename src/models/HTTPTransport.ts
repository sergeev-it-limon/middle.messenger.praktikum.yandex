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
	withCredentials?: boolean;
};

type TOptions<TData> = Omit<TOptionsInternal<TData>, "method"> & {
	timeout?: number;
};

type TRequest = <
	TDataRes,
	TDataReq extends XMLHttpRequestBodyInit = XMLHttpRequestBodyInit
>(
	url: string,
	options?: TOptions<TDataReq>
) => Promise<TDataRes>;

export class HTTPTransport {
	public get: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.GET },
			options.timeout
		);
	};

	public post: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.POST },
			options.timeout
		);
	};

	public put: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.PUT },
			options.timeout
		);
	};

	public delete: TRequest = (url, options = {}) => {
		return this.request(
			url,
			{ ...options, method: METHODS.DELETE },
			options.timeout
		);
	};

	private request = <TDataRes, TDataReq extends XMLHttpRequestBodyInit>(
		url: string,
		options: TOptionsInternal<TDataReq>,
		timeout = 5000
	): Promise<TDataRes> => {
		const {
			headers = {},
			method,
			data,
			withCredentials = false,
		} = options ?? {};

		return new Promise((resolve, reject) => {
			if (!method) {
				reject("No method");
				return;
			}

			const xhr = new XMLHttpRequest();
			xhr.withCredentials = withCredentials;
			const isGet = method === METHODS.GET;

			if (isGet && !!data) {
				if (typeof data !== "string") {
					console.error(`unexpected data type for get-request: ${typeof data}`);
					reject(
						new Error(`unexpected data type for get-request: ${typeof data}`)
					);
					return;
				}
				xhr.open(method, `${url}${queryStringify(JSON.parse(data))}`);
			} else {
				xhr.open(method, url);
			}

			Object.keys(headers).forEach((key) => {
				xhr.setRequestHeader(key, headers[key]);
			});

			if (headers["Content-type"] === undefined && !(data instanceof FormData)) {
				xhr.setRequestHeader("Content-type", "application/json");
			}

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					try {
						resolve(JSON.parse(xhr.response));
					} catch {
						resolve(xhr.response);
					}
				} else {
					try {
						reject(JSON.parse(xhr.response));
					} catch {
						reject(xhr.response);
					}
				}
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
