import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Routes from '../../config/routes';
import Notifications from 'react-notification-system-redux';

import Header from '../components/Header';

import { fetchAccounts } from '../../redux/accounts';
import { fetchCategories } from '../../redux/categories';

import 'react-table/react-table.css';
import '../../../styles/main.scss';

class MainLayout extends Component {

  componentDidMount() {
    this.props.fetchAccounts();
    this.props.fetchCategories();
  }

  render() {
    if (this.props.accountsFetching || this.props.categoriesFetching) {
      return ( <h1>Loading...</h1> );
    }

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
  state => ({
    notifications: state.notifications,
    accountsFetching: state.accounts.isFetching,
    categoriesFetching: state.categories.isFetching
  }),
  { fetchAccounts, fetchCategories }
)(MainLayout));

