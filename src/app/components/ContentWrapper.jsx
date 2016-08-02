import React from 'react';
import classnames from 'classnames';

export default props => {
  const { className, ...other } = props;
  return (
    <div {...other} className={classnames('container-row', className)}>
      <div className="column">
        {props.children}
      </div>
    </div>
  );
};
