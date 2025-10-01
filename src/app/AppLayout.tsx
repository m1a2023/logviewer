import { Outlet } from "react-router";
import Navbar from "../widgets/navbar/Navbar";

const AppLayout = (): React.ReactElement => {
	return (
		<div className="container-fluid my-3 d-flex flex-column gap-3">
			<Navbar />
			<main className="container">
				<Outlet />
			</main>
		</div>
	);
};

export default AppLayout;
