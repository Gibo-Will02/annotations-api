import * as React from "react"
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/institutionRosterPage" activeStyle>
						Api Info Page
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
