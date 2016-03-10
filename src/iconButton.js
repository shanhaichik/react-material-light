import React from 'react';
import classNames from 'classnames';
import FontIcon from './fontIcon';
import Ripple from './ripple';
import style from './button.css';

class IconButton extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.any,
    inverse: React.PropTypes.bool,
    neutral: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    neutral: true,
    primary: false
  };

  handleMouseUp = () => {
    this.refs.button.blur();
  };

  render() {
    const { accent, children, className, href, icon,
            inverse, neutral, primary, ...others } = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const classes = classNames([style.toggle], {
      [style[level]]: neutral,
      [style.inverse]: inverse
    }, className);

    const props = {
      ...others,
      href,
      ref: 'button',
      className: classes,
      disabled: this.props.disabled,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseUp,
      'data-react-toolbox': 'button'
    };

    return React.createElement(element, props,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      children
    );
  }
}

export default Ripple({ centered: true })(IconButton);
export { IconButton as RawIconButton };
