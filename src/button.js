'use strict';

import React from 'react';
import classNames from 'classnames';
import FontIcon from './fontIcon';
import Ripple from './ripple';
import style from './button.css';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    floating: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.any,
    inverse: React.PropTypes.bool,
    label: React.PropTypes.string,
    mini: React.PropTypes.bool,
    neutral: React.PropTypes.bool,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    mini: false,
    neutral: true,
    primary: false,
    raised: false
  };

  handleMouseUp = (event) => {
    this.refs.button.blur();
    if (this.props.onMouseUp) this.props.onMouseUp(event);
  };

  handleMouseLeave = (event) => {
    this.refs.button.blur();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };

  render() {
    const { accent, children, className, flat, floating, href, icon,
      inverse, label, mini, neutral, primary, raised, ...others } = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral'; // eslint-disable-line
    const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : 'flat'; // eslint-disable-line

    const classes = classNames([style[shape]], {
      [style[level]]: neutral,
      [style.mini]: mini,
      [style.inverse]: inverse
    }, className);

    const props = {
      ...others,
      href,
      ref: 'button',
      className: classes,
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave
    };

    return React.createElement(element, props,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      label,
      children
    );
  }
}

export default Ripple({ centered: false })(Button);
export { Button as RawButton };
