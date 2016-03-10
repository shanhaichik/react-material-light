'use strict';

import React from 'react';
import classNames from 'classnames';
import { uniqueId } from 'lodash';
import style from './text-field.css';

class TextField extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    floatingLabelText: React.PropTypes.node,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onEnterKeyDown: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.any,
    isFocused: React.PropTypes.bool,
    floating: React.PropTypes.bool,
    errorText: React.PropTypes.node
  };

  static defaultProps = {
    disabled: false,
    type: 'text',
    isFocused: false,
    floating: false
  };

  state = {
    value: this.props.value || '',
    isFocused: this.props.isFocused,
    isValid: true,
    errorText: this.props.errorText
  };

  componentWillMount() {
    this._uniqueId = uniqueId('input_');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  _onBlur = () => {
    this.setState({ isFocused: false });
  };

  _onFocus = () => {
    this.setState({ isFocused: true });
  };

  _onKeyDown = (e) => {
    if (e.keyCode === 13 && this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(e);
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };

  _onChange = e => {
    this.setState({
      value: e.target.value,
      isValid: e.target.validity.valid
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const {
        type,
        id,
        errorText,
        disabled,
        isFocused,
        floatingLabelText,
        hintText,
        value,
        onChange,
        onKeyDown,
        onFocus,
        onBlur,
        ...other } = this.props,

      inputProps = {
        id: id || this._uniqueId,
        className: classNames(style.textfield__input, this.props.className),
        type,
        disabled,
        focus: isFocused,
        onBlur: this._onBlur,
        onFocus: this._onFocus,
        onKeyDown: this._onKeyDown,
        onChange: this._onChange,
        value: this.state.value
      };

    const wrapClass = classNames(style.textfield, {
      [style['textfield--floating-label']]: this.props.floating,
      [style['textfield__no-floating']]: !this.props.floating,
      [style['is-focused']]: this.state.isFocused,
      [style['is-dirty']]: !!Boolean(this.state.value),
      [style['is-invalid']]: !this.state.isValid
    });

    const errorTextElement = errorText
      ? (<div className={style.textfield__error}> { errorText }</div>)
      : null;

    const labelElement = (
      <label className={style.textfield__label} htmlFor={this._uniqueId}>
        { this.props.floatingLabelText }
      </label>
    );

    const inputElement = (<input {...inputProps} {...other} />);

    return (
      <div className={wrapClass}>
        { inputElement }
        { labelElement }
        { errorTextElement }
      </div>
    );
  }
}

export default TextField;
