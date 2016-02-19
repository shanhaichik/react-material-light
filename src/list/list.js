import React from 'react';
import ListItem from './listItem';
import style from './list.css';

class List extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        ripple: React.PropTypes.bool,
        selectable: React.PropTypes.bool
    };

    static defaultProps = {
        className: '',
        ripple: false,
        selectable: false
    };

    renderItems () {
        return React.Children.map(this.props.children, (item) => {
            if (item.type === ListItem) {
                return React.cloneElement(item, {
                    ripple: this.props.ripple,
                    selectable: this.props.selectable
                });
            } else {
                return React.cloneElement(item);
            }
        });
    }

    render () {
        let className = style.list;
        if (this.props.className) className += ` ${this.props.className}`;
        return (
            <ul className={className}>
                {this.renderItems()}
            </ul>
        );
    }
}

export default List;
