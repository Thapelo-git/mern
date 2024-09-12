import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import NavBarLoggednView from "./NavBarLoggednView";
import { Link } from "react-router-dom";
interface NavBarProps{
    loggedInUser:User | null,
    onSignUpClicked:()=>void,
    onLoginClicked:()=>void,
    onLogoutSuccessful:()=>void,
}

const NavBar = ({loggedInUser,onSignUpClicked,onLoginClicked,onLogoutSuccessful}:NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
        <Navbar.Brand as={Link} to="/">
        HAIRCARE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"/>
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} to="/privacy">
              Privacy
            </Nav.Link>
          </Nav>
            <Nav className="ms-auto">
            {
                loggedInUser? 
                <NavBarLoggednView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                :<NavBarLoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
            }
            </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default NavBar