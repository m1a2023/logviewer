import React from "react";
import { DocumentCard } from "../../components/docs/DocumentCard";
import { DocumentMetadata } from "../../components/docs/DocumentMetadata";
import type { DocumentProps } from "../../shared/types/docs/DocumentProps";
import { IoMdDownload } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Download } from "../../features/utils/Download";
import { API_ENDPOINTS } from "../../shared/api/api/endpoints";
import { MetadataContainer } from "../../components/MetadataContainer";

export const AccordionDocumentCard = ({
	document,
}: DocumentProps): React.ReactElement => {
	const [isExpand, setIsExpand] = React.useState(false);

	const handleCardClick = () => setIsExpand(!isExpand);

	const handleDownloadClick = () => {
		const path = document.path + document.title;
		Download.file(
			encodeURI(`${API_ENDPOINTS.logs}/download?path=${path}`),
			document.title
		);
	};

	const handleDeleteClick = () => {
		// TODO
	};

	const DocumentMetadataContainer = () => (
		<>
			<MetadataContainer>
				<DocumentMetadata document={document} />
			</MetadataContainer>
		</>
	);

	const DocumentCardContainer = () => (
		<DocumentCard document={document}>
			<div className="col-md-auto cursor-pointer" onClick={handleDownloadClick}>
				<IoMdDownload size={23} />
			</div>

			<div className="col-md-auto cursor-pointer" onClick={handleDeleteClick}>
				<MdDelete size={23} />
			</div>
		</DocumentCard>
	);

	return (
		<div
			className="container list-group-item list-group-item-action"
			onDoubleClick={handleCardClick}
		>
			<DocumentCardContainer />
			{isExpand && <DocumentMetadataContainer />}
		</div>
	);
};
