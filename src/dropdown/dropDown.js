import React from 'react';
import ReactDOM from 'react-dom';
import ClassNames from 'classnames';
import Input from './input';
import events from '../utils/events';

import style from './dropdown.css';


class Dropdown extends React.Component {
    static propTypes = {
        auto: React.PropTypes.bool,
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        error: React.PropTypes.string,
        label: React.PropTypes.string,
        onBlur: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        source: React.PropTypes.array.isRequired,
        template: React.PropTypes.func,
        value: React.PropTypes.string
    };

    static defaultProps = {
        auto: true,
        className: '',
        disabled: false
    };

    state = {
        active: false,
        up: false
    };

    componentWillUpdate (prevState, nextState) {
        if (!prevState.active && nextState.active) {
            events.addEventsToDocument({click: this.handleDocumentClick});
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.active && !this.state.active) {
            events.removeEventsFromDocument({click: this.handleDocumentClick});
        }
    }

    handleDocumentClick = (event) => {
        if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
            this.setState({active: false});
        }
    };

    handleMouseDown = (event) => {
        events.pauseEvent(event);
        const client = event.target.getBoundingClientRect();
        const screen_height = window.innerHeight || document.documentElement.offsetHeight;
        const up = this.props.auto ? client.top > ((screen_height / 2) + client.height) : false;
        if (this.props.onFocus) this.props.onFocus(event);
        this.setState({active: true, up});
    };

    handleSelect = (item, event) => {
        if (this.props.onBlur) this.props.onBlur(event);
        if (!this.props.disabled && this.props.onChange) {
            this.props.onChange(item, event);
            this.setState({active: false});
        }
    };

    getSelectedItem = () => {
        if (this.props.value) {
            for (const item of this.props.source) {
                if (item.value === this.props.value) return item;
            }
        } else {
            return this.props.source[0];
        }
    };

    renderTemplateValue (selected) {
        const className = ClassNames(style.field, {
            [style.errored]: this.props.error,
            [style.disabled]: this.props.disabled
        });

        return (
            <div className={className} onMouseDown={this.handleMouseDown}>
                <div className={`${style.templateValue} ${style.value}`}>
                    {this.props.template(selected)}
                </div>
                {this.props.label ? <label className={style.label}>{this.props.label}</label> : null}
                {this.props.error ? <span className={style.error}>{this.props.error}</span> : null}
            </div>
        );
    }

    renderValue (item, idx) {
        const className = item.value === this.props.value ? style.selected : null;
        return (
            <li key={idx} className={className} onMouseDown={this.handleSelect.bind(this, item.value)}>
                {this.props.template ? this.props.template(item) : item.label}
            </li>
        );
    }

    render () {
        const {template, source, ...others} = this.props;
        const selected = this.getSelectedItem();
        const className = ClassNames(style.root, {
            [style.up]: this.state.up,
            [style.active]: this.state.active,
            [style.disabled]: this.props.disabled
        }, this.props.className);

        return (
            <div className={className}>
                <Input
                    {...others}
                    className={style.value}
                    onMouseDown={this.handleMouseDown}
                    readOnly
                    type={template ? 'hidden' : null}
                    value={selected.label}
                />
                {template ? this.renderTemplateValue(selected) : null}
                <ul className={style.values} ref='values'>
                    {source.map(this.renderValue.bind(this))}
                </ul>
            </div>
        );
    }
}

export default Dropdown;
