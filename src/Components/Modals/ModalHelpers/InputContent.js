// ============================================
// SettingsContent.js
// ----
// Content wrapper for a current setting & form
// - responsible for switching current to form
// ============================================

// ---- External Dependencies ----
import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

// ---- Internal Dependencies ----

// ---- Styles ----
import styles from './InputContent.css';

// ---- React Class ----
class InputContent extends Component {

    static propTypes = {
        minHeight: React.PropTypes.number,
        springConfig: React.PropTypes.arrayOf(React.PropTypes.number)
    }

    static defaultProps = {
        minHeight: 100,
        springConfig: {stiffness: 170, damping: 26}
    }


    render() {
        return (
            <Motion defaultStyle={ this._getAnimDefValue() }
                    style={this._getAnimEndValue() }>
                { interpolatingStyle => {

                    return ( <div
                        ref="container"
                        style={interpolatingStyle}>
                            { this.props.children }

                    </div>)


                }

                }
            </Motion>
        );
    }

    // Animation
    // ---------------------
    _getAnimDefValue() {
        const { springConfig } = this.props;

        return {
            height: this.props.minHeight
            /*minHeight: {val: 0, config: springConfig}*/
        };
    }

    _getAnimEndValue() {
        const { minHeight, springConfig } = this.props;

        return {
            height: spring(minHeight, springConfig)
            /*            minHeight: {val: minHeight, config: springConfig}*/
        };
    }

}
;

// ==== Module Export ====
export default InputContent;
