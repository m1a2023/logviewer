import type { Method } from "axios";

export class RequestError {
	constructor(url: string, code: number, method: Method) {
		const error = `Failed to send request to source ${url}, HTTP method ${method}, code ${code}`;
		return new Error(error);
	}
}

export class APIError {
	constructor(error: unknown) {
		const err = `API error: ${error}`;
		return new Error(err);
	}
}
