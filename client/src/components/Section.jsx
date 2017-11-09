import React from 'react';
import classnames from 'classnames';

export default props => {
  const { id, ...other } = props;
  return (
    <section id={id} {...other} >
      <div className="row">
        {props.children}
      </div>
    </section>
  );
};
