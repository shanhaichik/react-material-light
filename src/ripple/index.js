'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './ripple.css';

/*
* Стандартные настройки декоратора
* */
const defaults = {
    // движение от центра
    centered: false,
    // Классы для кастомизации
    className: '',
    // Коэффицент расплытия
    spread: 2
};

const Ripple = (options = {}) => {
    // Получаем и мержим стандартные настройки с настройками компонента
    const {
        centered: defaultCentered,
        className: defaultClassName,
        spread: defaultSpread
    } = {...defaults, ...options};

    // ComposedComponent - Компонент переданный для декорирования
    return ComposedComponent => {
        // Возвращаем новый обернутый компонент
        return class RippledComponent extends Component {

            static propTypes = {
                children: PropTypes.any,
                disabled: PropTypes.bool,
                ripple: PropTypes.bool,
                rippleCentered: PropTypes.bool,
                rippleClassName: PropTypes.string,
                rippleSpread: PropTypes.number
            };

            static defaultProps = {
                disabled: false,
                ripple: true,
                rippleCentered: defaultCentered,
                rippleClassName: defaultClassName,
                rippleSpread: defaultSpread
            };

            state = {
                active: false,
                left: null,
                restarting: false,
                top: null,
                width: null
            };

            /*
            * Handler на MouseDown
            * @param {MouseDown} e
            * */
            handleMouseDown = e => {
                // Если элемент не заблокирован, запускаем анимацию
                if (!this.props.disabled) this.start(e);
                // Callback нажания
                if (this.props.onMouseDown) this.props.onMouseDown(e);
            };

            /*
             * Handler на MouseUp
             * Удаляет обработчик и обновляем стейт компонента
             * */
            handleEnd = () => {
                document.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
                this.setState({active: false});
            };

            /**
             * Старт анимации после нажания на элемент
             * @param {number} pageX - координаты курсора по х
             * @param {number} pageY - координаты курсона по y
             * @param {boolean} touch - тип события нажания
             *
             */
            start = ({pageX, pageY}, touch = false) => {
                // определяем тип события
                if (!this._isTouchRippleReceivingMouseEvent(touch)) {
                    this.touch = touch;
                    // Вешаем handler завершения в зависимости от события
                    document.addEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
                    // Получаем значения стилей, обновляем стейт
                    const {top, left, width} = this._getDescriptor(pageX, pageY);
                    this.setState({active: false, restarting: true, top, left, width}, () => {
                        this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions
                        this.setState({active: true, restarting: false});
                    });
                }
            };

            /**
             * Определение типа события
             * @param {boolean} touch
             * @private
             */
            _isTouchRippleReceivingMouseEvent (touch) {
                return this.touch && !touch;
            };

            /**
             * Получение координат компонента.
             * Формирование объекта стилей
             * @param {number} pageX - координаты курсора по х
             * @param {number} pageY - координаты курсона по y
             * @private
             */
            _getDescriptor (pageX, pageY) {
                const {left, top, height, width} = ReactDOM.findDOMNode(this).getBoundingClientRect();
                const {rippleCentered: centered, rippleSpread: spread} = this.props;
                return {
                    left: centered ? 0 : pageX - left - width / 2 - window.scrollX,
                    top: centered ? 0 : pageY - top - height / 2 - window.scrollY,
                    width: width * spread
                };
            };

            render() {
                // Если пульсация отколючена, возвращаем компонент с настройками
                if (!this.props.ripple) {
                    return <ComposedComponent {...this.props} />;
                }
                else {
                    // Берем параметры
                    const {
                        children,
                        ripple,
                        rippleClassName: className,
                        rippleCentered: centered,
                        rippleSpread: spread,
                        ...other
                        } = this.props;

                    // Формируем классы изходя из стейта
                    const rippleClassName = classNames(style.normal, {
                        [style.active]: this.state.active,
                        [style.restarting]: this.state.restarting
                    }, className);

                    // Берем параметры состояния
                    const { left, top, width } = this.state;
                    // Определяем масштаб
                    const scale = this.state.restarting ? 0 : 1;
                    // Формируем inline стиль для трансформации

                    const rippleStyle = {
                        transform: `translate3d(${-width / 2 }px, ${-width / 2 }px, 0) scale(${scale})`,
                        width,
                        height: width
                    };

                    return (
                        <ComposedComponent {...other} onMouseDown={this.handleMouseDown}>
                            {children ? children : null}
                              <span data-react-toolbox='ripple' className={style.wrapper}>
                                <span ref='ripple' role='ripple' className={rippleClassName} style={rippleStyle} />
                              </span>
                        </ComposedComponent>
                    );
                }
            }
        }
    }

};

export default Ripple;