import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../../css/Header.module.scss";

export default function Header() {
  return (
    <div>
      <Navbar className={styles.nav} bg="light" fixed="top" expand="lg">
        <Navbar.Brand>Pokemon</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink exact to="/pokemon" activeClassName={styles.active}>
              Home
            </NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink to="/Favourite" activeClassName={styles.active}>
              Favourite List
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
