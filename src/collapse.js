import React from 'react';
import ClassNames from 'classnames';

import style from './collapse.css';

class Collapse extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        open: React.PropTypes.bool,
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string
    };

    static defaultProps = {
        className: '',
        title: '',
        subtitle: ''
    };

    state = {
        open: this.props.open
    };

    renderHead() {
        return (
            <div className={style['title-wrapper']} onClick={open => this.setState({open: !this.state.open})}>
                <div className={style['title-block']}>
                    <span className={style.title}>{this.props.title}</span>
                    <span className={style.subtitle}>{this.props.subtitle}</span>
                </div>
            </div>
        )
    }

    renderBody() {
        let classBody = ClassNames(style.body, {
            [style.hide]: !this.state.open
        });
        const children =  React.Children.map(this.props.children, (item) => {
                if(React.isValidElement(item))
                    return React.cloneElement(item);
        });
        return <div className={classBody}>{children}</div>
    }

    render() {
        let className = style.collapse;
        if (this.props.className) className += ` ${this.props.className}`;
        return (
            <div className={className}>
                {this.renderHead()}
                {this.renderBody()}
            </div>
        )
    }
}

export default Collapse;