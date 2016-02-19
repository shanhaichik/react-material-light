'use strict';

import React from 'react';
/*import PureRenderMixin from 'react-addons-pure-render-mixin';*/
import classNames from 'classnames';

import style from  './paper.css';

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

   /* mixin: [
        PureRenderMixin
    ],*/

    getDefaultProps() {
        return {
            zDepth: 1
        }
    },


    render() {
        const classWrapper = classNames(style.paper,[style[`paper--depth-${this.props.zDepth}`]], this.props.className);

        return (
            <div className={classWrapper}>
                { this.props.children }
            </div>
        )
    }

});