import type React from "react";
import reduceSize from "../../features/utils/SizeReducer";
import type { SingleFileProps } from "../../shared/types/files/FileProps";

interface FileCardProps extends SingleFileProps {
	children?: React.ReactNode;
}

const FileCard = ({ file, children }: FileCardProps): React.ReactElement => {
	const size = reduceSize(file.size);

	return (
		<>
			<div className="row">
				<div className="col text-start">{file.name}</div>
				<div className="col-md-auto text-mid">{size}</div>
				{children}
			</div>
		</>
	);
};

export default FileCard;
