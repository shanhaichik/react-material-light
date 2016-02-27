'use strict';

import React, { Component, PropTypes } from 'react';
import PureRender from 'react-pure-render-decorator';
import TableHead from './tableHead';
import TableRow from './tableRow';
import classNames from 'classnames';
import {isObject, isArray, isEqual} from 'lodash';

import style from './table.css'

export default class Table extends React.Component {

    static propTypes = {
        /*
        * Установка кастомных классов
        * */
        className: PropTypes.string,

        /*
        * Установка имен заголовков из Модели
        * */
        heading: PropTypes.bool,

        /*
        * Объект описываюший модель данных из source
        * */
        model: PropTypes.object,

        /*
        * Callback при изменении данных в ячейках
        * */
        onChange: PropTypes.func,

        /*
        * Callback вызывается при изменении выбора строки
        * */
        onSelect: PropTypes.func,

        /*
        * Показывать или не показывать checkbox выбора
        * */
        selectable: PropTypes.bool,

        /*
        * Массив индексов для выбора строк таблицы
        * */
        selected: PropTypes.array,

        /*
        * Данные для рендера
        * */
        source: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),

        /*
         * Режим редактирования контента в таблице
         * */
        editable:React.PropTypes.bool,

        /*
         * Настройки заголовков страницы
         * */
        headers: PropTypes.object,

        /*
         * Описание IconMenu в конце таблицы
         * */
        actions: PropTypes.array
    };

    static defaultProps = {
        className: '',
        heading: true,
        selectable: false,
        selected: [],
        source: null,
        editable:false
    };

    handleFullSelect = () => {
        if (this.props.onSelect) {
            const {source, selected} = this.props;
            const newSelected = source.length === selected.length ? [] : source.map((i, idx) => idx);
            this.props.onSelect(newSelected);
        }
    };

    handleRowSelect = (index) => {
        if (this.props.onSelect) {
            const position = this.props.selected.indexOf(index);
            const newSelected = [...this.props.selected];
            if (position !== -1) newSelected.splice(position, 1); else newSelected.push(index);
            this.props.onSelect(newSelected);
        }
    };

    handleRowChange = (index, key, value) => {
        if (this.props.onChange) {
            this.props.onChange(index, key, value);
        }
    };

    shouldComponentUpdate(props, state){
        return !isEqual(props, this.props);
    }

    renderHead () {
        if (this.props.heading) {
            const {model, selected, source, selectable, headers} = this.props;
            const isSelected = selected.length === source.length;
            return (
                <TableHead
                    model={model}
                    onSelect={this.handleFullSelect}
                    selectable={selectable}
                    selected={isSelected}
                    headers={headers}
                    actions={this.props.actions.length}
                />
            );
        }
    }

    renderBody () {
        let rows;

        if(isArray(this.props.source)) {
           rows = this.props.source.map((data, index) => {
                return (
                    <TableRow
                        data={data}
                        index={index}
                        key={index}
                        model={this.props.model}
                        onChange={this.props.editable ? this.handleRowChange.bind(this, index) : false}
                        onSelect={this.handleRowSelect.bind(this, index)}
                        selectable={this.props.selectable}
                        selected={this.props.selected.indexOf(index) !== -1}
                        actions={this.props.actions}
                    />
                );
            });
        }

        if(isObject(this.props.source)) {
            rows = this.props.source.list.map((id, index) => {
                const row = this.props.source.data[id];

                return (
                    <TableRow
                        data={row}
                        index={index}
                        key={index}
                        model={this.props.model}
                        onChange={this.props.editable ? this.handleRowChange.bind(this, index) : false}
                        onSelect={this.handleRowSelect.bind(this, index)}
                        selectable={this.props.selectable}
                        selected={this.props.selected.indexOf(index) !== -1}
                        actions={this.props.actions}
                    />
                );
            });
        }

        return <tbody>{rows}</tbody>;
    }

    render () {
        let className = style.root;
        if (this.props.className) className += ` ${this.props.className}`;
        return (
            <table className={className}>
                {this.renderHead()}
                {this.renderBody()}
            </table>
        );
    }
}