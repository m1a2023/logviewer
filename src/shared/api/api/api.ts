import axios, { HttpStatusCode, type Method } from "axios";
import { APIError, RequestError } from "./errors";

export interface IAPI {
	create<T, R>(item: T): Promise<R>;
	read<T, R>(item?: T): Promise<R>;
	update<T, R>(item: T): Promise<R>;
	delete<T, R>(item: T): Promise<R>;
}

export abstract class AAPI implements IAPI {
	private url: string;

	constructor(url: string) {
		this.url = url;
		return this;
	}

	protected async performRequest<R>(
		method: Method,
		data: any,
		headers: any
	): Promise<R> {
		try {
			const res = await axios.request({
				url: this.url,
				data: data,
				headers: headers,
			});
			if (res.status !== HttpStatusCode.Ok) {
				throw new RequestError(this.url, res.status, method);
			}
			return res.data;
		} catch (error) {
			throw new APIError(error);
		}
	}

	abstract create<T, R>(item: T): Promise<R>;
	abstract read<T, R>(item?: T): Promise<R>;
	abstract update<T, R>(item: T): Promise<R>;
	abstract delete<T, R>(item: T): Promise<R>;
}
