import React from 'react';
import style from './list.css';

const ListDivider = ({inset}) => {
    const className = inset ? `${style.divider} ${style.inset}` : style.divider;
    return <hr className={className} />;
};

ListDivider.propTypes = {
    inset: React.PropTypes.bool
};

ListDivider.defaultProps = {
    inset: false
};

export default ListDivider;
