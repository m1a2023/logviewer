import { useContext } from "react";
import { AppContext } from "../../app/AppContext";

export const ColorTheme = (inversed?: boolean): string => {
	const theme = useContext(AppContext)?.Theme.theme;
	const cur = String(theme);
	if (inversed) {
		return cur === "dark" ? "light" : "dark";
	}
	return cur;
};
