'use strict';

import React from 'react';
import classNames from 'classnames';
import {uniqueId} from 'lodash';
import style from './text-field.css';
/*
 * TODO:
 *
 *  - hint text
 * */

/*
 * Component Text Field
 * */
export default React.createClass({

    propType: {
        children: React.PropTypes.node,

        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The text string to use for the default value.
         */
        defaultValue: React.PropTypes.any,

        /**
         * Disables the text field if set to true.
         */
        disabled: React.PropTypes.bool,

        /**
         * The error content to display.
         */
        errorText: React.PropTypes.node,

        /**
         * The content to use for the floating label element.
         */
        floatingLabelText: React.PropTypes.node,

        /**
         * The hint content to display.
         */
        hintText: React.PropTypes.node,

        /**
         * The id prop for the text field.
         */
        id: React.PropTypes.string,

        /**
         * Callback function that is fired when the textfield loses focus.
         */
        onBlur: React.PropTypes.func,

        /**
         * Callback function that is fired when the textfield's value changes.
         */
        onChange: React.PropTypes.func,

        /**
         * The function to call when the user presses the Enter key.
         */
        onEnterKeyDown: React.PropTypes.func,

        /**
         * Callback function that is fired when the textfield gains focus.
         */
        onFocus: React.PropTypes.func,

        /**
         * Callback function fired when key is pressed down.
         */
        onKeyDown: React.PropTypes.func,

        /**
         * Specifies the type of input to display
         * such as "password" or "text".
         */
        type: React.PropTypes.string,


        /**
         * The value of the text field.
         */
        value: React.PropTypes.any,

        /**
         * Focus input on init
         */
        isFocused:  React.PropTypes.bool,

        floating:React.PropTypes.bool
    },

    /*mixins: [PureRenderMixin],*/

    getDefaultProps() {
        return {
            disabled: false,
            type: 'text',
            isFocused: false,
            floating: false
        }
    },

    getInitialState() {
        return {
            valueInput: this.props.value || undefined,
            isFocused: this.props.isFocused,
            isValid: true,
            errorText: this.props.errorText
        }
    },

    componentWillMount() {
        this._uniqueId = uniqueId('input_');
    },

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ valueInput: nextProps.value,})
    },

    _onBlur(e) {
        this.setState({isFocused: false});
    },

    _onFocus(e) {
        this.setState({isFocused: true});
    },

    _onKeyDown(e) {
        if (e.keyCode === 13 && this.props.onEnterKeyDown)
            this.props.onEnterKeyDown(e);

        if (this.props.onKeyDown)
            this.props.onKeyDown(e);
    },

    _onChange(e) {
        this.setState({
            valueInput: e.target.value,
            isValid: e.target.validity.valid
        });

        if (this.props.onChange)
            this.props.onChange(e);
    },

    render() {
        const {
                type,
                id,
                errorText,
                disabled,
                isFocused,
                floatingLabelText,
                hintText,
                ...other} = this.props,

            inputProps = {
                id: id || this._uniqueId,
                className: classNames({[style.textfield__input]:true}, this.props.className),
                type: type,
                disabled: disabled,
                focus: isFocused,
                onBlur: this._onBlur,
                onFocus: this._onFocus,
                onKeyDown: this._onKeyDown,
                onChange: this._onChange
            };

        let wrapClass = classNames({
            [style.textfield]: true,
            [style['textfield--floating-label']]: this.props.floating,
            [style['textfield__no-floating']]: !this.props.floating,
            [style['is-focused']]: this.state.isFocused,
            [style['is-dirty']]: Boolean(this.state.valueInput),
            [style['is-invalid']]: !this.state.isValid
        });

        let errorTextElement = errorText
            ? (<div className={style.textfield__error}> { errorText }</div>)
            : null;

        let inputElement = (<input {...inputProps} {...other} />);

        let labelElement = (
            <label className={style.textfield__label} htmlFor={this._uniqueId}>
                { this.props.floatingLabelText }
            </label>
        );

        return (
            <div className={wrapClass}>
                { inputElement }
                {  labelElement }
                { errorTextElement }
            </div>
        );
    }
});