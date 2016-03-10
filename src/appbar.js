import React from 'react';
import сlassNames from 'classnames';
import style from './appbar.css';

const AppBar = (props) => {
  const className = сlassNames(style.root, {
    [style.fixed]: props.fixed,
    [style.flat]: props.flat
  }, props.className);

  return (
    <header className={className}>
      {props.children}
    </header>
  );
};

AppBar.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  fixed: React.PropTypes.bool,
  flat: React.PropTypes.bool
};

AppBar.defaultProps = {
  className: '',
  fixed: false,
  flat: false
};

export default AppBar;
