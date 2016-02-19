'use strict';

import React from 'react';
import Checkbox from '../checkbox';
import style from './table.css';

const TableHead = ({model, onSelect, selectable, selected, headers, actions}) => {
    let selectCell, actionsCell;

    const contentCells = Object.keys(model).map((key) => {
        key = headers[key].name || key;
        return <th key={key}>{key}</th>;
    });

    if (selectable) {
        selectCell = (
            <th key='select' className={style.selectable}>
                <Checkbox onChange={onSelect} checked={selected} />
            </th>
        );
    }

    if(actions) {
        actionsCell = (<th key="actions" className={style.actions}> </th>);
    }

    return (
        <thead>
        <tr>{[selectCell, ...contentCells, actionsCell]}</tr>
        </thead>
    );
};

TableHead.propTypes = {
    className: React.PropTypes.string,
    model: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    selected: React.PropTypes.bool
};

TableHead.defaultProps = {
    className: '',
    model: {},
    selected: false
};

export default TableHead;
