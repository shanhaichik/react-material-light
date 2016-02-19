'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Check from './Check';


export default class Checkbox extends Component {
    static propTypes = {
        /*
        * Выбран или нет
        * */
        checked: PropTypes.bool,

        /*
         * Установка кастомных классов
         * */
        className: React.PropTypes.string,

        /*
        * Заблокирована или нет
        * */
        disabled: React.PropTypes.bool,

        /*
        * Текстовый label для checkbox
        * */
        label: React.PropTypes.any,

        /*
        * Callback при изменении состояния выбора
        * */
        onChange: React.PropTypes.func
    };


    /*
    * Снятие фокусировки с элемента
    * */
    blur () {
        this.refs.input.blur();
    }

    /*
    * Установка фокуса на элемент
    * */
    focus () {
        this.refs.input.focus();
    }

    /*
    * Handler для смены стостояния выбран/не выбран.
    * Вызов callback onChange
    * */
    handleToggle = e => {
        if (e.pageX !== 0 && e.pageY !== 0) this.blur();
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(!this.props.checked, e);
        }
    };

    render() {
        const { onChange, ...others } = this.props;

        const inputClass = classNames({
            'disabled': this.props.disabled,
            'mdl-checkbox':true
        }, this.props.className);

        return (
            <label className={inputClass}>
                <input
                    {...others}
                    className="mdl-checkbox__input"
                    onClick={this.handleToggle}
                    readOnly
                    ref='input'
                    type='checkbox'
                />

                {this.props.label ? <span data-role='label' className={'l'}>{this.props.label}</span> : null}
            </label>
        );
    }
}