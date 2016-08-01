import React from 'react';
import ContentRow from './ContentContainer';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

export default ({ onGenerateDummyDataClick, onDeleteDataClick }) => (
  <header>
    <ContentRow>
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
            <MenuItem onClick={onGenerateDummyDataClick}>Generate data</MenuItem>
            <MenuItem onClick={onDeleteDataClick}>Clear all data</MenuItem>
            <MenuItem divider />
            <MenuItem>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    </ContentRow>
  </header>
);
