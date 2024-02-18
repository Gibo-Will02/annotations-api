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
					<NavLink to="/courseAssignmentInfoPage" activeStyle>
						Assignments Page
					</NavLink>
					<NavLink to="/institutionCoursesPage" activeStyle>
						Institution Courses Page
					</NavLink>
					<NavLink to="/courseDataPage" activeStyle>
						Course Data Page
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
