import type { Doc } from "./Document";

export type DocSingleResponse = {
	status_code: number;
	doc: Doc;
};

export type DocMultipleResponse = {
	status_code: number;
	documents: Doc[];
};
