import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

// import { connect } from 'react-redux';
// import { deleteAllData } from '../actions';
// import { generateData } from '../utils/generateData';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.state = {
      isOpen: false,
      isSettingsOpen: false
    };
  }

  toggleCollapse() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleSettings() {
    this.setState({
      isSettingsOpen: !this.state.isSettingsOpen
    });
  }

  render() {
    return (
      <Navbar fixed="top" color="primary" expand="md">
        <Link to="/" className="navbar-brand">stashflow</Link>
        <NavbarToggler onClick={this.toggleCollapse} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/bozz/stashflow">Github</NavLink>
            </NavItem>
            <Dropdown nav isOpen={this.state.isSettingsOpen} toggle={this.toggleSettings}>
              <DropdownToggle nav caret>
                Settings
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Generate data</DropdownItem>
                <DropdownItem>Clear all data</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Lorem Ipsum</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;

