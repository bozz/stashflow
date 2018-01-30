import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Routes from '../../config/routes';
import Notifications from 'react-notification-system-redux';

import Header from '../components/Header';

import 'react-table/react-table.css';
import '../../../styles/main.scss';

class MainLayout extends Component {
  render() {
    return (
      <div className="app">
        <Header />

        <div className="wrapper">
          <nav id="sidebar">
            <ul className="list-unstyled">
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li><NavLink to="/accounts">Accounts</NavLink></li>
              <li><NavLink to="/reports">Reports</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
            </ul>
          </nav>

          <div className="page-content">
            <Routes />
          </div>

          <Notifications notifications={this.props.notifications} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect(
  state => ({ notifications: state.notifications })
)(MainLayout));

