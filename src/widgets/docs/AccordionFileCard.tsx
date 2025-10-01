import React from "react";
import FileCard from "../../components/files/FileCard";
import { MdDelete } from "react-icons/md";
import { MetadataContainer } from "../../components/MetadataContainer";
import type { SingleFileProps } from "../../shared/types/files/FileProps";

interface AccordionFileCardProps extends SingleFileProps {
	onDelete: (file: File) => void;
}

export const AccordionFileCard = ({
	file,
	onDelete,
}: AccordionFileCardProps): React.ReactElement => {
	const [isExpand, setIsExpand] = React.useState(false);

	const handleCardClick = () => setIsExpand(!isExpand);

	const handleDeleteClick = () => onDelete(file);

	const FileMetadataContainer = () => (
		<>
			<MetadataContainer>
				<></>
			</MetadataContainer>
		</>
	);

	const FileCardContainer = () => (
		<FileCard file={file}>
			<div className="col-md-auto cursor-pointer" onClick={handleDeleteClick}>
				<MdDelete size={23} />
			</div>
		</FileCard>
	);

	return (
		<>
			<div
				className="container list-group-item list-group-item-action"
				onDoubleClick={handleCardClick}
			>
				<FileCardContainer />
				{isExpand && <FileMetadataContainer />}
			</div>
		</>
	);
};
