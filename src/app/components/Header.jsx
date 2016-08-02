import React from 'react';
import { connect } from 'react-redux';
import ContentRow from './ContentContainer';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import * as actions from '../actions';
import { generateData } from '../utils/generateData';

const Header = ({ onGenerateDummyDataClick, onDeleteDataClick }) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    onGenerateDummyDataClick: () => {
      generateData(dispatch);
    },
    onDeleteDataClick: () => {
      dispatch(actions.deleteAllData());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Header);
