import React from "react";
import { AccordionFileCard } from "./AccordionFileCard";

interface SelectedFilesProps {
	files: File[];
	capture: (initialState: File[] | (() => File[])) => void;
}

const SelectedFilesList = ({
	files,
	capture,
}: SelectedFilesProps): React.ReactElement => {
	const removeFile = (file: File) => {
		capture(files.filter((f) => f != file));
	};

	return (
		<>
			<div className="list-group">
				{files.map((file) => (
					<AccordionFileCard file={file} onDelete={removeFile} />
				))}
			</div>
		</>
	);
};

export default SelectedFilesList;
