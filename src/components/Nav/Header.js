
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';

import {useState} from 'react';
import {Link} from 'react-router-dom';
function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
          <Navbar color="light" light expand="md">
            <Link to="/" className="navbar-brand">Firebase Demo</Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link className="nav-link" to="/firestore">Firestore</Link>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Auth
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Link to="/signIn">SignIn</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/signUp">SignUp</Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
              <NavbarText>ReactJs-Reactstrap</NavbarText>
            </Collapse>
          </Navbar>
        </div>
      );
}
export default Header;