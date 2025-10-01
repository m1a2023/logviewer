import type React from "react";
import { ColorTheme } from "../../features/theme/ColorTheme";
import type { ColorsBootstrap6 } from "../../features/color/ColorsBootstrap6";

type SpinnerType = "border" | "grow";

interface SpinnerProps {
	type: SpinnerType;
	text?: string;
	color?: ColorsBootstrap6;
	className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
	type = "border",
	text = "Loading...",
	color = ColorTheme(),
	className,
}) => (
	<>
		<div className={`spinner-${type} ${className} text-${color}`} role="status">
			<span className="visually-hidden justify-content-center">{text}</span>
		</div>
	</>
);
