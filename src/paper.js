'use strict';

import React from 'react';
import classNames from 'classnames';
import {isEqual} from 'lodash';

import style from  './paper.css';

class Paper extends React.Component {

    static propTypes: {


        /**
         * This number represents the zDepth of the paper shadow.
         */
        depth: React.PropTypes.number
    };

    static defaultProps = {
        depth: 1
    };

    shouldComponentUpdate(props){
        return !isEqual(props, this.props);
    }

    render() {
        const classWrapper = classNames(style.paper,[style[`paper--depth-${this.props.depth}`]], this.props.className);

        return (
            <div className={classWrapper}>
                { this.props.children }
            </div>
        )
    }

}

export default Paper;