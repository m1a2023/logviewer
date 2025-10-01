import { NavLink } from "react-router";

export const NavbarButtonLink = ({
	text,
	className,
	href,
	children,
	onClick,
	...props
}: {
	text: string;
	className?: string;
	href: string;
	children?: React.ReactElement;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => (
	<NavLink
		to={href}
		className={`nav-link ${className}`}
		onClick={onClick}
		{...props}
		end
	>
		{children}
		{text}
	</NavLink>
);
