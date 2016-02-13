'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import warning from 'warning';
import classNames from 'classnames';
import {uniqueId} from 'lodash';

import './text-field.css';

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
         * If true, shows the underline for the text field.
         */
        underlineShow: React.PropTypes.bool,

        /**
         * The value of the text field.
         */
        value: React.PropTypes.any,

        /**
         * Focus input on init
         */
        isFocused:  React.PropTypes.bool
    },

    mixin: PureRenderMixin,

    getDefaultProps() {
        return {
            disabled: false,
            type: 'text',
            underlineShow: true,
            isFocused: false
        }
    },

    getInitialState() {
        return {
            isFocused: this.props.isFocused,
            errorText: this.props.errorText
        }
    },

    componentWillMount() {
        this._uniqueId = uniqueId('input_');
    },

    _onBlur(e) {
        this.setState({isFocused: false});
    },

    _onFocus(e) {
        this.setState({isFocused: true});
    },

    _onKeyDown(e) {

    },

    render() {
        const {type} = this.props,

        inputProps = {
            id: this._uniqueId,
            className: 'textfield__input',
            type: type,
            disabled: this.props.disabled,
            onBlur: this._onBlur,
            onFocus: this._onFocus,
            onKeyDown: this._onKeyDown
        };

        var wrapClass = classNames({
            'textfield': true,
            'textfield--floating-label': !!this.props.floatingLabelText,
            'is-focused': this.state.isFocused
        });

        let errorTextElement = this.props.errorText
            ? (<div className="textfield-error"> { this.props.errorText }</div>)
            : null;

        let inputElement = (<input {...inputProps} />);

        let labelElement = (
            <label className="textfield__label" htmlFor={this._uniqueId}>
                { this.props.floatingLabelText }
            </label>
        );

        return (
            <div className={wrapClass}>
                {inputElement}
                {labelElement}
            </div>
        );
    }

});