import React, { Component } from 'react';
import Routes from '../../config/routes';

import Header from '../components/Header';

import 'react-table/react-table.css';
import '../../../styles/main.scss';

export default class MainLayout extends Component {
  render() {
    return (
      <div className="app">
        <Header />

        <div className="wrapper">
          <nav id="sidebar">
            <ul className="list-unstyled">
              <li><a href="/dashboard">Dashboard</a></li>
              <li className="active"><a href="/accounts">Accounts</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </nav>

          <div className="page-content">
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

