import React from 'react';
import { connect } from 'react-redux';
import { deleteAllData } from '../actions';
import { generateData } from '../utils/generateData';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import ContentWrapper from '../components/ContentWrapper';

const Header = ({ dispatch }) => (
  <header>
    <ContentWrapper>
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">stashflow</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown
            title={<Glyphicon glyph="cog" />}
            id="basic-nav-dropdown"
          >
            <MenuItem onClick={() => { generateData(dispatch); }}>Generate data</MenuItem>
            <MenuItem onClick={() => { dispatch(deleteAllData()); }}>Clear all data</MenuItem>
            <MenuItem divider />
            <MenuItem>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    </ContentWrapper>
  </header>
);

export default connect()(Header);
