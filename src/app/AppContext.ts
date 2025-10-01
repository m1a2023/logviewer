import { createContext } from "react";
import type { GlobalContext } from "../shared/types/context/GlobalContext";

// App context creation
export const AppContext = createContext<GlobalContext | null>(null);
