import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Button,
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Container,
} from "reactstrap";
import { logout } from "../DataManagers/authManager";
import Logo from "../assets/dreamdwellingslogo.png";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  console.log(loggedInUser);

  // <NavItem style={{
  //   width: "30px",
  //   height: "30px",
  //   marginRight: "10px",
  // }}>
  //   <img src={Logo} alt="Logo" /> Dream Dwellings
  // </NavItem>

  return (
    <Container fluid>
      <Navbar expand="lg">
        {loggedInUser ? (
          <>
            <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
              <img
                src={loggedInUser.profilePicture}
                alt="ProfilePicture"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              {loggedInUser.userName}
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav
                navbar
                className="mx-auto"
                style={{ padding: "5px", marginBottom: "5px" }}
              >
                <NavItem onClick={() => setOpen(false)} className="mr-5">
                  <NavLink tag={RRNavLink} to="/homes">
                    For Sale
                  </NavLink>
                </NavItem>
                <NavItem onClick={() => setOpen(false)} className="mr-2">
                  <NavLink tag={RRNavLink} to="/userhomes">
                    My Properties
                  </NavLink>
                </NavItem>
                <NavItem onClick={() => setOpen(false)}>
                  <NavLink tag={RRNavLink} to="/usersaves">
                    Saved Properties
                  </NavLink>
                </NavItem>
                {loggedInUser.roles.includes("Admin") && (
                  <NavItem onClick={() => setOpen(false)}>
                    <NavLink tag={RRNavLink} to="/listhome">
                      Create Listing
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
            <Button
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                {/* <Button color="primary">Login</Button> */}
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </Container>
  );
}
