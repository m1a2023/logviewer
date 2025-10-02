import { ApplicationTheme } from "../features/theme/Theme";
import type { GlobalContext } from "../shared/types/context/GlobalContext";
import { Outlet } from "react-router";
import useTheme from "../features/theme/UseTheme";
import { AppContext } from "./AppContext";
import { StrictMode, useState } from "react";
import type {Segment} from "../shared/types/segments/Segment.ts";
import type {RequestChain} from "../shared/types/logs/RequestChain.ts";



const App = (): React.ReactElement => {
	// Get and set application theme
	const [theme, setTheme] = useTheme(new ApplicationTheme());
	// Get and set is user logged in
	const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const [segments, setSegments] = useState<Segment[]>([])

    const [chains, setChains] = useState<Array<RequestChain[]>>([])


	// Fill app context
	const context: GlobalContext = {
		Theme: { theme, setTheme },
		Logged: { loggedIn, setLoggedIn },
        Segments: {segments, setSegments},
        Chains: {chains, setChains}
	};

	return (
		<StrictMode>
			<AppContext.Provider value={context}>
				<div data-bs-theme={theme}>
					<Outlet />
				</div>
			</AppContext.Provider>
		</StrictMode>
	);
};

export default App;
