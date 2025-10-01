import { AAPI } from "../api";

export class FormDataAPI extends AAPI {
	async create<T, R>(item: T): Promise<R> {
		const formData = new FormData();
		for (const key in item) {
			if (item[key] instanceof File) {
				formData.append(key, item[key]);
			} else if (Array.isArray(item[key]) && item[key][0] instanceof File) {
				item[key].forEach((file: File, index: number) => {
					formData.append(`${key}[${index}]`, file);
				});
			} else {
				formData.append(key, JSON.stringify(item[key]));
			}
		}
		return this.performRequest("POST", formData, {});
	}

	async read<T, R>(item?: T): Promise<R> {
		return this.performRequest("GET", item, {});
	}

	async update<T, R>(item: T): Promise<R> {
		return this.performRequest("PUT", item, {});
	}

	async delete<T, R>(item: T): Promise<R> {
		return this.performRequest("DELETE", item, {});
	}
}
