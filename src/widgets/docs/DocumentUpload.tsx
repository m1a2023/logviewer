import type React from "react";
import MultipleFileInput from "../../components/files/FileInput";
import { useState } from "react";
import SelectedFilesList from "./SelectedFilesList";

const DocumentsUpload = (): React.ReactElement => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	return (
		<>
			<div className="mb-4">
				<MultipleFileInput files={selectedFiles} capture={setSelectedFiles} />
			</div>
			<SelectedFilesList files={selectedFiles} capture={setSelectedFiles} />
		</>
	);
};

export default DocumentsUpload;
