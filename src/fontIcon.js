import React from 'react';
import classNames from 'classnames';

const FontIcon = ({ children, className, value, ...other }) => {
  const classes = classNames(
    { 'material-icons': typeof value === 'string' },
    className
  );
  return (
    <span className={classes} {...other} >
      {value}
      {children}
    </span>
  );
};

FontIcon.propTypes = {
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
};

FontIcon.defaultProps = {
  className: ''
};

export default FontIcon;
