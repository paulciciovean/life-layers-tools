import React from 'react'
import styled from "styled-components";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333333cc; /* Add transparency to the color */
  color: #fff;
  padding: 1rem;
  position: fixed;
  width: 100vw;
  top:0;
  height: 5vh;
  z-index:99;
`;
const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-left: 1.8rem;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #f39c12;
  }
  &. login-link {
    margin-left: auto;
  }
`;

const LoginLink = styled(NavLink)`
  margin-left: auto;
  margin-right: 0;
`;


export const Navbar = () => {
  return (
    <NavbarContainer>
      <NavList>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
        <NavItem>
          <LoginLink href="/login">Login</LoginLink>
        </NavItem>
      </NavList>
    </NavbarContainer>
  )
}

export default Navbar