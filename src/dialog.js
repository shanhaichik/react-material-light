'use strict';

import React from 'react';
import classNames from 'classnames';
import Button from './button';
import Overlay from './overlay';
import style from './dialog.css';

const Dialog = (props) => {
  const actions = props.actions.map((action, idx) => {
    const className = classNames(style.button, { [action.className]: action.className });
    return <Button key={idx} {...action} className={className}/>;
  });

  const className = classNames([style.root, style[props.type]], {
    [style.active]: props.active
  }, props.className);

  return (
    <Overlay active={props.active} onClick={props.onOverlayClick}>
      <div className={className}>
        <section role="body" className={style.body}>
          {props.title ? <h6 className={style.title}>{props.title}</h6> : null}
          {props.children}
        </section>
        <nav role="navigation" className={style.navigation}>
          {actions}
        </nav>
      </div>
    </Overlay>
  );
};

Dialog.propTypes = {
  actions: React.PropTypes.array,
  active: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  onOverlayClick: React.PropTypes.func,
  title: React.PropTypes.string,
  type: React.PropTypes.string
};

Dialog.defaultProps = {
  actions: [],
  active: false,
  type: 'normal'
};

export default Dialog;
