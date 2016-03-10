import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './overlay.css';

class Overlay extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    invisible: React.PropTypes.bool,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    invisible: false
  };

  componentDidMount() {
    this.app = document.body;
    this.node = document.createElement('div');
    this.app.appendChild(this.node);
    this.handleRender();
  }

  componentDidUpdate() {
    this.handleRender();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.node);
    this.app.removeChild(this.node);
  }

  handleRender() {
    const className = classNames(style.root, {
      [style.active]: this.props.active,
      [style.invisible]: this.props.invisible
    }, this.props.className);

    ReactDOM.render(
      <div className={className}>
        <div className={style.overlay} onClick={this.props.onClick}/>
        {this.props.children}
      </div>
      , this.node);
  }

  render() {
    return React.DOM.noscript();
  }
}

export default Overlay;
