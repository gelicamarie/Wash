import styled from "styled-components";
import Wash from "../Wash";
import Link from "next/link";

export const Line = styled.hr`
  margin-top: 1.5rem;
  border-top: 0.18rem solid black;
`;
export const Nav = styled.nav`
  positon: sticky;
  top: 0;
  z-index: 10;
  height: 80px;
  font-weight: 500;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-top: 1.8rem;
  letter-spacing: 0.1rem;
`;

export const NavLogo = styled(Link)`
  cursor: pointer;
`;
export const Logo = styled(Wash)`
  width: 12rem;
  cursor: pointer;
`;

export const Menu = styled.ul`
display: flex;
list-style-type: none;
align-items: center;
text-align: center;
}
`;
export const NavItem = styled.li`
margin: auto 1rem;

}
`;

export const NavBtn = styled.li`
  margin: auto 1rem;
  border-radius: 50px;
  border: 0.1rem solid black;
  padding: 0.8rem 2rem;
  background: var(--color-theme-green-0);
  color: var(--color-theme-bg);
  font-weight: 400;
`;
