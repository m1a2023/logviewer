import { AAPI } from "../api";

export class JsonAPI extends AAPI {
	create<T, R>(item: T): Promise<R> {
		return this.performRequest("POST", item, {
			"Content-Type": "appilcation/json",
		});
	}

	read<T, R>(item?: T): Promise<R> {
		return this.performRequest("GET", item, {});
	}

	update<T, R>(item: T): Promise<R> {
		return this.performRequest("PUT", item, {});
	}

	delete<T, R>(item: T): Promise<R> {
		return this.performRequest("DELETE", item, {});
	}
}
