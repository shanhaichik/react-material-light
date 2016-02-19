import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../fontIcon';
import ListItemContent from './listItemContent';
import Ripple from '../ripple';
import style from './list.css';

class ListItem extends React.Component {
    static propTypes = {
        avatar: React.PropTypes.string,
        caption: React.PropTypes.string.isRequired,
        children: React.PropTypes.any,
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        leftIcon: React.PropTypes.any,
        legend: React.PropTypes.string,
        onClick: React.PropTypes.func,
        rightIcon: React.PropTypes.any,
        ripple: React.PropTypes.bool,
        selectable: React.PropTypes.bool,
        to: React.PropTypes.string,
        route: React.PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        ripple: false,
        selectable: false
    };

    handleClick = (event) => {
        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick(event, this.props.route);
        }
    };

    renderContent () {
        const className = ClassNames(style.item, {
            [style.withLegend]: this.props.legend,
            [style.disabled]: this.props.disabled,
            [style.selectable]: this.props.selectable,
            [style.pointer]: this.props.pointer
        }, this.props.className);

        return (
            <span className={className}>
        {this.props.leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={this.props.leftIcon} /> : null}
                {this.props.avatar ? <img className={style.avatar} src={this.props.avatar} /> : null}
                <ListItemContent caption={this.props.caption} legend={this.props.legend} />
                {this.props.rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={this.props.rightIcon} /> : null}
      </span>
        );
    }

    render () {
        return (
            <li className={style.listItem} onClick={this.handleClick} onMouseDown={this.props.onMouseDown}>
                {this.props.to ? <a href={this.props.to}>{this.renderContent()}</a> : this.renderContent()}
                {this.props.children}
            </li>
        );
    }
}

export default Ripple({
    className: style.ripple,
    centered: false
})(ListItem);
export {ListItem as RawListItem};
