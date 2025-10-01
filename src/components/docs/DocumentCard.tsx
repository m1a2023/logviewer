import { IoIosDocument } from "react-icons/io";
import { extractDateAndTime } from "../../features/utils/DateAndTime";
import type { DocumentProps } from "../../shared/types/docs/DocumentProps";

export interface DocumentCardProps extends DocumentProps {
	children?: React.ReactNode;
}

export const DocumentCard = ({
	document,
	children,
}: DocumentCardProps): React.ReactElement => {
	const date = new Date(document.changed_at);
	return (
		<div className="row">
			<div className="col-md-auto">
				<IoIosDocument size={23} />
			</div>
			<div className="col text-start">{document.title}</div>
			<div className="col-md-auto text-end">{extractDateAndTime(date)}</div>
			{children}
		</div>
	);
};
