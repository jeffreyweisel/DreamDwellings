import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarToggler,
  Container,
} from "reactstrap";
import { logout } from "../DataManagers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);

  const toggleNavbar = () => setOpen(!open);

  console.log(loggedInUser);

  return (
    <Container fluid>
      <Navbar expand="lg">
        {loggedInUser ? (
          <>
            <NavItem style={{ listStyle: "none" }}>
              Welcome, {loggedInUser.firstName}!
              <NavLink tag={RRNavLink} to="/homes"></NavLink>
            </NavItem>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav navbar style={{ marginLeft: "auto", padding: "5px" }}>
                <NavItem
                  onClick={() => setOpen(false)}
                  style={{ marginRight: "14px" }}
                >
                  <NavLink tag={RRNavLink} to="/homes">
                    For Sale
                  </NavLink>
                </NavItem>
                <NavItem
                  onClick={() => setOpen(false)}
                  style={{ marginRight: "14px" }}
                >
                  <NavLink tag={RRNavLink} to="/userhomes">
                    My Properties
                  </NavLink>
                </NavItem>
                <NavItem
                  onClick={() => setOpen(false)}
                  style={{ marginRight: "14px" }}
                >
                  <NavLink tag={RRNavLink} to="/usersaves">
                    Saved Properties
                  </NavLink>
                </NavItem>
                {loggedInUser.roles.includes("Admin") && (
                  <NavItem
                    onClick={() => setOpen(false)}
                    style={{ marginRight: "14px" }}
                  >
                    <NavLink tag={RRNavLink} to="/listhome">
                      Create Listing
                    </NavLink>
                  </NavItem>
                )}
               <NavItem onClick={(e) => {
  e.preventDefault();
  logout().then(() => {
    setLoggedInUser(null);
    setOpen(true); // Set isOpen to true
  });
}}>
  <NavLink tag={RRNavLink} to="#">
    Logout
  </NavLink>
</NavItem>
              </Nav>
            </Collapse>
          </>
        ) : (
          <Nav navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login"></NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </Container>
  );
}
