import React from 'react';
import ClassNames from 'classnames';
import style from './reorder.css';

const ActionReorder = (props) => {
    const {className, ...other} = props;
    const classSvg = ClassNames(style.reorder, className);

    return (
        <svg name={classSvg} {...other} viewBox="0 0 23 23">
            <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/>
        </svg>
    )
};

export default ActionReorder;
