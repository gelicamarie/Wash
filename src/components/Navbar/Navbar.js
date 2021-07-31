import Link from "next/link";

import Wash from "../Wash";
import {
  Nav,
  NavContainer,
  NavLogo,
  Logo,
  Menu,
  NavItem,
  NavBtn,
  Line,
} from "./Navbar.styles";

const Navbar = () => {
  return (
    <>
      <div>
        <Nav>
          <NavContainer>
            <NavLogo href="/" passHref>
              <a>
                <Logo />
              </a>
            </NavLogo>

            <Menu>
              <NavItem>
                <Link href="/marketplace">Marketplace</Link>
              </NavItem>
              <NavItem>
                <Link href="/user">Profile</Link>
              </NavItem>
              <NavBtn>
                <Link href="/create">Create NFT</Link>
              </NavBtn>
            </Menu>
          </NavContainer>
        </Nav>
        <Line />
      </div>
    </>
  );
};

export default Navbar;
