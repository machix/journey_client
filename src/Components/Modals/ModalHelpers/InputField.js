// ==========================================
// InputField.js
// ----
// Standard "text input" for various settings
// ==========================================

// ---- External Dependencies ----
import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

// ---- Internal Dependencies ----

// ---- Styles ----
import styles from './InputField.css';

// ---- React Class ----
class InputField extends Component {

    /*  static propTypes = {
     value: React.PropTypes.string.isRequired,
     onChange: React.PropTypes.func.isRequired,
     onHeightChange: React.PropTypes.func
     }*/

    render() {
        return (
            <div ref='textdiv' className={ styles.container }>
                <TextareaAutosize
                    ref="textarea"
                    className={ styles.base }
                    minRows={3}
                    style={
                    {
                        overflow: 'hidden',
                        width: '100%',
                        resize: 'none',
                        transition: 'border-color 0.2s cubic-bezier(.22,.67,.52,.92),box-shadow 0.2s cubic-bezier(.22,.67,.52,.92)'
                        }
                    }
                    placeholder="Have you ever wanted to meet the man of steel? (I know I have!) Give your friend the trip of a lifetime with Superman"
                    value={ this.props.value }
                    useCacheForDOMMeasurements={ true }
                    defaultValue={ this.props.initialValue }
                    onChange={ this.props.onChange }
                    onHeightChange={ this.props.onHeightChange }

                    id="Phrase"

                />
            </div>
        );
    }

/*    onFocus={ this._handleFocus.bind(this) }

_handleFocus() {
        const { value } = this.props;
        ReactDOM.findDOMNode(this.refs.textarea).setSelectionRange(value.length, value.length);
    }*/

}
;

/*           className={ styles.base }*/

// ==== Module Export ====
export default InputField;
