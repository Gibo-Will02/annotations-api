import * as React from "react"
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/institutionRosterPage" activeStyle>
						Institution Roster Page
					</NavLink>
					<NavLink to="/courseListPage" activeStyle>
						User Course Page
					</NavLink>
					<NavLink to="/institutionCoursesPage" activeStyle>
						InstitutionCoursesPage
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
