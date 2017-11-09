import React, { Component } from 'react';
import Routes from '../../config/routes';

import Header from './Header';

import '../../../styles/main.scss';

export default class App extends Component {
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

