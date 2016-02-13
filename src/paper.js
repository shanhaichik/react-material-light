'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './paper.css';

export default React.createClass({

    propTypes: {
        /**
         * Children passed into the paper element.
         */
        children: React.PropTypes.node,

        /**
         * This number represents the zDepth of the paper shadow.
         */
        zDepth: React.PropTypes.number
    },

    mixin: [
        PureRenderMixin
    ],

    getDefaultProps() {
        return {
            zDepth: 1
        }
    },

    render() {
        const style = 'paper paper--depth-' + this.props.zDepth;

        return (
            <div className={style}>
                { this.props.children }
            </div>
        )
    }

});