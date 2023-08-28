import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getCookie } from "typescript-cookie";

interface Props {
  auth: boolean;
  btnAction: () => void;
}

//Has links to various pages
//Profile/Login buttons are hidden depending on the login state

function MainNavbar({ auth, btnAction }: Props) {
  return (
    <Navbar bg="light" expand="lg" className="mb-2">
      <Container fluid>
        <Navbar.Brand href="/">RS App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            {auth && <Nav.Link href="/profile">Profile</Nav.Link>}
          </Nav>
          {getCookie("RSP-cookie") && (
            <Button href="/requestsRSP" variant="outline">
              Requests
            </Button>
          )}
          {!auth && (
            <div>
              <Button href="/register" variant="outline">
                Register
              </Button>
              <Button variant="outline-primary" onClick={btnAction}>
                Login
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
