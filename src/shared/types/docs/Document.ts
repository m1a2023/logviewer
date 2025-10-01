export type Doc = {
	id: number;
	author_id: number;
	uploader_id: number;
	title: string;
	size: number;
	path: string;
	hash: string;
	created_at: Date;
	changed_at: Date;
};
