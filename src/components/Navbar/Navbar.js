import Link from "next/link";
import dynamic from "next/dynamic";
import Wash from "../Wash";
import {
  Nav,
  NavContainer,
  NavLogo,
  Logo,
  Menu,
  NavItem,
  Line,
} from "./Navbar.styles";
import useMetaState from "../../lib/use-metastate";
const ConnectButton = dynamic(() => import("../WalletButton"), {
  ssr: false,
});

const Navbar = () => {
  const { isConnected } = useMetaState();

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
              {isConnected && (
                <NavItem>
                  <Link href="/user">Profile</Link>
                </NavItem>
              )}
              <ConnectButton />
            </Menu>
          </NavContainer>
        </Nav>
        <Line />
      </div>
    </>
  );
};

export default Navbar;
