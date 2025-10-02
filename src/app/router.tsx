import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import AppLayout from "./AppLayout";
import DocumentsUpload from "../widgets/docs/DocumentUpload";
import LogLayout from "../pages/Logs/LogLayout";
import LogsView from "../pages/Logs/LogsView";
import ChainView from "../pages/Chains/ChainView.tsx";
import GanttChart from "../components/diagrams/GanttDiagram.jsx";
import { PluginsView } from "../pages/Plugins/PluginsView.tsx";
import { PluginInfo } from "../widgets/plugins/PluginInfo.tsx";
import { PluginsLayout } from "../pages/Plugins/PluginsLayoyt.tsx";

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
							path: "view",
							element: <LogsView />,
						},
						{
							path: "upload",
							element: <DocumentsUpload />,
						},
						{
							path: "plugins",
							element: <PluginsLayout />,
							children: [
								{
									index: true,
									element: <Navigate to="ls" replace/>
								},
								{
									path: "ls",
									element: <PluginsView />,
								},
							]
						}
					],
				},
                {
                    path: "/chain/:filename/:id",
                    element: <ChainView />,
                },
                {
                    path: "/gantt/:filename",
                    element: <GanttChart/>,
                }
			],
		},
	],
}
]);

export default router;
