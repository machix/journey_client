/**
 * Created by Machinatron on 2017-06-20.
 */
import React from 'react';
import { connect } from 'react-redux';
import EmojiDisplay from './EmojiDisplay'
import { CSSTransitionGroup } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        product: state.businessReducer.editGifty
    }
};

const mapDispatchToProps = dispatch => ({
});

class EmojiList extends React.Component {

    render() {
        const renderThis = () => {
            if(!this.props.product.emojis) {
                return null
            } else {
                return(
                    this.props.product.emojis.map((emoji, idx) => (
                            <EmojiDisplay key={idx} emoji ={emoji} index={idx}></EmojiDisplay>
                    ))
                )
            }
        }

        return (

                <CSSTransitionGroup
                    transitionName="documents-list"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                    component="div"
                    className="documents-list emoji-style"
                >
                    {renderThis()}

                </CSSTransitionGroup>

        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EmojiList);