import React from 'react';
import ClassNames from 'classnames';
import Overlay from './overlay';
import PureRender from 'react-pure-render-decorator';
import style from './sidepanel.css';


@PureRender
class SidePanel extends React.Component {
    static propTypes = {
        active: React.PropTypes.bool,
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        onOverlayClick: React.PropTypes.func,
        type: React.PropTypes.oneOf(['left', 'right'])
    };

    static defaultProps = {
        active: false,
        className: '',
        type: 'left'
    };

    render() {
        const className = ClassNames([style.root, style[this.props.type]], {
            [style.active]: this.props.active
        }, this.props.className);

        return (
            <Overlay active={this.props.active} onClick={this.props.onOverlayClick}>
                <div className={className}>
                    <aside className={style.content}>
                        {this.props.children}
                    </aside>
                </div>
            </Overlay>
        )
    }
}

export default SidePanel;
