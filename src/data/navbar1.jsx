import React , {Component} from "react"
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import auth from "../services/authServices";
class NavBar1 extends Component {

      render (){
        let user = auth.getUser()
        console.log(user)
          return(
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
            <Container>
            <Navbar.Brand href="/home">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {user
                ?user.role=="student"
                ? <Nav.Link href="/studentDetails">Student Details</Nav.Link>
                :user.role=="admin"
                ?<Nav.Link href="/register">Register</Nav.Link>
                :user.role=="faculty"
                ?<Nav.Link href="/coursesAssigned">Courses</Nav.Link>
                :"":""}
              
                {user?user.role=="admin"
                ?<NavDropdown title="Assign" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/studentCourse">Student of Course</NavDropdown.Item>
                  <NavDropdown.Item href="/studentFaculity">Student of Faculity</NavDropdown.Item>
                </NavDropdown>
                :user.role=="student"
                ? <Nav.Link href="/allClasses">All Classes</Nav.Link> 
                :user.role=="faculty"
                ?<NavDropdown title="Classes Details" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/scheduledClasses">Scheduled Classes</NavDropdown.Item>
                <NavDropdown.Item href="/AllScheduledClasses">All Scheduled Classes</NavDropdown.Item>
                </NavDropdown>
                :"":""}
                
                {user?user.role=="admin"
                ?<NavDropdown title="View" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/allStudent">All Students</NavDropdown.Item>
                  <NavDropdown.Item href="/allFaculty">All Faculties</NavDropdown.Item>
                </NavDropdown>
                :user.role=="student"
                ?<Nav.Link href="/allCourse">All Course</Nav.Link>:"":""}
              </Nav>
              <Nav>
              <Nav.Link eventKey={2} href="/home">
                   {user?`Welcome ${user.name}`:""}
                </Nav.Link>
                {!user?
                <Nav.Link eventKey={2} href="/login">
                  Login
                </Nav.Link>
                :<Nav.Link eventKey={2} href="/logout">
                Logout
                </Nav.Link>}
                
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
          )
      }
}
export default NavBar1;