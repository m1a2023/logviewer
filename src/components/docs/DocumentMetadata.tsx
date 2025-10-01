import type React from "react";
import reduceSize from "../../features/utils/SizeReducer";
import { extractDateAndTime } from "../../features/utils/DateAndTime";
import type { DocumentProps } from "../../shared/types/docs/DocumentProps";

export const DocumentMetadata = ({
	document,
}: DocumentProps): React.ReactElement => {
	const size = reduceSize(document.size);
	const created = extractDateAndTime(new Date(document.created_at));
	const changed = extractDateAndTime(new Date(document.created_at));

	const doc = {
		Size: size,
		Path: document.path,
		"Author ID": document.author_id,
		"Uploader ID": document.uploader_id,
		"Created at": created,
		"Changed at": changed,
		Hash: document.hash,
	};

	const MetadataRow = ({
		title,
		value,
		className,
	}: {
		title: string;
		key: number;
		value: string | number;
		className: string;
	}) => (
		<div className="row">
			<div className="col-md-auto">
				<input
					className={`${className}`}
					type="text"
					value={title}
					disabled
					readOnly
				></input>
			</div>
			<div className="col user-select-all">
				<input
					className={`${className}`}
					type="text"
					value={value}
					disabled
					readOnly
				></input>
			</div>
		</div>
	);

	return (
		<>
			<div className="container">
				{Object.entries(doc).map(([title, value], i) => (
					<MetadataRow
						title={title}
						value={value}
						key={i}
						className="form-control mb-2"
					/>
				))}
			</div>
		</>
	);
};
