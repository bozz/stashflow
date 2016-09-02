import React from 'react';
import Select from 'react-select';

export default (props) => {
  return (
    <Select
      {...props}
      value={props.input.value || ''}
      onBlur={() => { props.input.onBlur(props.input.value); }}
      onChange={(e) => { props.input.onChange(e ? e.value : ''); }}
      options={props.options}
    />
  );
};
