import React from 'react';
import { connect } from 'react-redux';
import { deleteAllData } from '../actions';
import { generateData } from '../utils/generateData';

import Section from '../components/Section';

const Header = ({ dispatch }) => (
  <Section id="header">
    <div className="branding">
      <h1>stashflow</h1>
    </div>
    <div className="menu pure-menu pure-menu-horizontal">
      <ul className="pure-menu-list">
        <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
          <a href="#" id="menuLink1" className="pure-menu-link">Settings</a>
          <ul className="pure-menu-children">
            <li className="pure-menu-item">
              <a href="#" className="pure-menu-link" onClick={() => { generateData(dispatch); }}>Generate data</a>
            </li>
            <li className="pure-menu-item">
              <a href="#" className="pure-menu-link" onClick={() => { dispatch(deleteAllData()); }}>Clear all data</a>
            </li>
            <li className="pure-menu-item"><a href="#" className="pure-menu-link">Lorem Ipsum</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </Section>
);

export default connect()(Header);
