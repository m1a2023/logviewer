import { createRoot } from "react-dom/client";
import router from "./app/router";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />
);
