import type { EColors } from "../../../features/theme/Theme";
import type { Segment} from "../segments/Segment.ts";
import type {RequestChain} from "../logs/RequestChain.ts";

export interface GlobalContext {
	Theme: { theme: EColors; setTheme: (color: EColors) => void };
	Logged: {
		loggedIn: boolean;
		setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	};
    Segments: { segments: Segment[];
        setSegments: React.Dispatch<React.SetStateAction<Segment[]>>;
    };
    Chains: {
        chains: RequestChain[];
        setChains: React.Dispatch<React.SetStateAction<RequestChain[]>>;
    }
}
