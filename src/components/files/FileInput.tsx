import { type ChangeEvent } from "react";
import type {
	FileCaptureProps,
	MultipleFileProps,
} from "../../shared/types/files/FileProps";

interface MultipleFileInputProps extends MultipleFileProps, FileCaptureProps {}

const MultipleFileInput = ({ files, capture }: MultipleFileInputProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			capture(Array.from(e.target.files));
		} else {
			capture([]);
		}
	};

	return (
		<>
			<div className="input-group">
				<label className="form-control cursor-pointer">
					<input
						type="file"
						className="display-none"
						multiple
						onChange={handleChange}
					/>
					{files?.length > 0
						? `Selected ${files.length} files`
						: "Choose Files"}
				</label>
				<button className="btn btn-outline-primary" type="button">
					Upload
				</button>
			</div>
		</>
	);
};

export default MultipleFileInput;
