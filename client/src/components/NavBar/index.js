//The top navBar that allows one to transition from view page to viewpage
import * as React from "react"
import { Nav, NavLink, NavMenu } from "./NavbarElements";

/**
 * The custom navbar used for the app for switching between the different pages
 * @returns NavBar react component
 */
const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/institutionDataPage" activeStyle>
						Institution Data Page
					</NavLink>
					<NavLink to='mockAssignmentAnalytics' activeStyle>
						Mock Assignment Analytics
					</NavLink>
					<NavLink to='mockAssignmentPageAnalytics' activeStyle>
						Mock Assignment Page Analytics
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
					<NavLink to='/assignmentGradesPage' activeStyle>
						Assignment Grades Page
					</NavLink>
					<NavLink to='/assignmentAnnotationsPage' activeStyle>
						Assignment Annotations Page
					</NavLink>
					<NavLink to='/assignmentReportsPage' activeStyle>
						Assignment Reports Page
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
