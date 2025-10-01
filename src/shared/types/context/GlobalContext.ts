import type { EColors } from "../../../features/theme/Theme";

export interface GlobalContext {
	Theme: { theme: EColors; setTheme: (color: EColors) => void };
	Logged: {
		loggedIn: boolean;
		setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	};
}
