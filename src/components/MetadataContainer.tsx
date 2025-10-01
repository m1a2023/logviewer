interface MetadataContainerProps {
	children: React.ReactNode;
}

export const MetadataContainer = ({ children }: MetadataContainerProps) => (
	<>
		<hr className="divider" />
		<div className="collapse show">{children}</div>
	</>
);
