import { createBrowserRouter } from "react-router";
import App from "./App";
import AppLayout from "./AppLayout";
import DocumentsUpload from "../widgets/docs/DocumentUpload";
import LogLayout from "../pages/Logs/LogLayout";
import LogsView from "../pages/Logs/LogsView";

const router = createBrowserRouter([
{
	element: <App />,
	children: [
		{
			element: <AppLayout />,
			children: [
				{
					path: "/logs",
					element: <LogLayout />,
					children: [
						{
							path: "/logs/view",
							element: <LogsView />,
						},
						{
							path: "/logs/upload",
							element: <DocumentsUpload />,
						},
					],
				},
				// {
				// 	path: "/login",
				// 	element: <LoginLayout />,
				// 	children: [ ]
				// }
			],
		},
	],
}
]);

export default router;
