'use strict';

import React from 'react';
import classNames from 'classnames';

import style from './grid.css';

const Grid = ({ children, cells, className, spacing }) => {
  const grid = React.Children.map(children, (item) => {
    if (React.isValidElement(item)) {
      const classCell = classNames(
        style.cell,
        style[`cell--${cells}-col`],
        className
      );
      return <div className={classCell}>{React.cloneElement(item)}</div>;
    }
  });

  const classGrid = classNames(style.grid, {
    [style['grid--no-spacing']]: !spacing
  });

  return (<div className={classGrid}>{grid}</div>);
};

Grid.propTypes = {
  children: React.PropTypes.any,
  cells: React.PropTypes.number,
  className: React.PropTypes.string,
  spacing: React.PropTypes.bool
};

Grid.defaultProps = {
  cells: 1,
  className: '',
  spacing: true
};

export default Grid;
