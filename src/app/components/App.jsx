import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <div>
      <div className="container">
        <h1>stashflow</h1>
        {children}
      </div>
    </div>
  );
};

App.propTypes = { children: PropTypes.object };

export default App;
