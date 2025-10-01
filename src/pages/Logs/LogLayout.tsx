import type React from "react";
import { Outlet } from "react-router";

const LogLayout = (): React.ReactElement => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default LogLayout;
