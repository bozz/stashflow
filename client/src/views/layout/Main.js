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

        <div className="content">
          <Routes />
        </div>
      </div>
    );
  }
}

