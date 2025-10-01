import { useContext } from "react";
import { IconSvgDocumentStack } from "../../components/icons/IconSvgDocumentStack";
import { NavbarButtonLink } from "./NavbarButtonLink";
import { AppContext } from "../../app/AppContext";

const Navbar = (): React.ReactElement => {
	// Get auth info
	const auth = useContext(AppContext)?.Logged;
	// Handle log out if logged in
	const handleLogOut = () => {
		auth?.setLoggedIn(false);
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-expand-md navbar-expand-xl navbar-expand-sm">
				<div className="container-fluid gap-2">
					<IconSvgDocumentStack size={36} />
					<NavbarButtonLink
						text="Yaksa"
						href="/logs"
						className="navbar-brand px-2"
					></NavbarButtonLink>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="true"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-collapse justify-between"
						id="navbarNavAltMarkup"
					>
						<div className="navbar-nav gap-2 me-auto mb-2 mb-lg-0">
							<NavbarButtonLink text="View" href="/logs/view" />
							<NavbarButtonLink text="Upload" href="/logs/upload" />
						</div>
						<NavbarButtonLink
							text={auth?.loggedIn ? "Log out" : "Login"}
							href="/login"
							onClick={handleLogOut}
							className="d-flex"
						/>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
