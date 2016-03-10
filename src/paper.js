'use strict';

import React from 'react';
import classNames from 'classnames';
import { isEqual } from 'lodash';

import style from './paper.css';

class Paper extends React.Component {

  static propTypes: {
    depth: React.PropTypes.number
  };

  static defaultProps = {
    depth: 1
  };

  render() {
    const classWrapper = classNames(
      style.paper,
      [style[`paper--depth-${this.props.depth}`]],
      this.props.className
    );

    return (
      <div className={classWrapper}>
        { this.props.children }
      </div>
    );
  }
}

export default Paper;
