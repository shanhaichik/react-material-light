'use strict';

import React from 'react';
import ClassNames from 'classnames';
import Checkbox from '../checkbox';
import {IconMenu, MenuItem} from '../menu';
import utils from '../utils/utils';
import style from './table.css';

class TableRow extends React.Component {
    static propTypes = {
        data: React.PropTypes.object,
        model: React.PropTypes.object,
        onSelect: React.PropTypes.func,
        selectable: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        onChange: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        actions:React.PropTypes.array
    };

    handleInputChange = (key, type, event) => {
        const value = type === 'checkbox' ? event.target.checked : event.target.value;
        this.props.onChange(key, value);
    };

    renderSelectCell () {
        if (this.props.selectable) {
            return (
                <td className={style.selectable}>
                    <Checkbox checked={this.props.selected} onChange={this.props.onSelect} />
                </td>
            );
        }
    }

    renderActionsCell() {
        if(this.props.actions) {
            return (
                <td className={style.actions} >
                    <IconMenu icon='more_vert' position='top-right' iconRipple>
                        {
                            this.props.actions.map((button, i) => {
                                const {onClick, ...other} = button;
                                return (<MenuItem
                                    key={i+'_btn'}
                                    onClick={onClick.bind(null, this.props.data['id'])}
                                    {...other} />)
                            })
                        }
                    </IconMenu>
                </td>
            )
        }
    }

    renderCells () {
        return Object.keys(this.props.model).map((key) => {
            return <td key={key}>{this.renderCell(key)}</td>;
        });
    }

    renderCell (key) {
        const value = this.props.data[key];
        if (this.props.onChange) {
            return this.renderInput(key, value);
        } else if (value) {
            return value.toString();
        }
    }

    renderInput (key, value) {
        const inputType = utils.inputTypeForPrototype(this.props.model[key].type);
        const inputValue = utils.prepareValueForInput(value, inputType);
        const checked = inputType === 'checkbox' && value ? true : null;
        return (
            <input
                checked={checked}
                onChange={this.handleInputChange.bind(null, key, inputType)}
                type={inputType}
                value={inputValue}
            />
        );
    }

    render () {
        const className = ClassNames(style.row, {
            [style.editable]: this.props.onChange,
            [style.selected]: this.props.selected
        });

        return (
            <tr className={className}>
                {this.renderSelectCell()}
                {this.renderCells()}
                {this.renderActionsCell()}
            </tr>
        );
    }
}

export default TableRow;
