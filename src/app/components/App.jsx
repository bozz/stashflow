import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <div>
      <div className="container">
        <h1>React-Redux-Boilerplate</h1>
        {children}
      </div>
    </div>
  );
};

App.propTypes = { children: PropTypes.object };

export default App;
