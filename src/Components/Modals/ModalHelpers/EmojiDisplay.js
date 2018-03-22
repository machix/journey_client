import React from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import {Emoji} from 'emoji-mart-lite';

const mapStateToProps = (state, ownProps) => {
    return {
        index: ownProps.index,
        emoji: ownProps.emoji,
        editGifty: state.businessReducer.editGifty
    }
};

const mapDispatchToProps = dispatch => ({
    deleteEmoji: (editGifty) =>{
        dispatch({type: 'UPDATE_GIFTY', editGifty: editGifty})
    }

});

const test = {
    cursor: 'pointer'
}



class EmojiDisplay extends React.Component {
    

    deleteEmoji(index) {
        var products1 = update(this.props.editGifty, {emojis: {$splice: [[index, 1]]}})
        this.props.deleteEmoji(products1)
    }


    render() {
        return (
            <div style={test}
                onClick={() => {this.deleteEmoji(this.props.index)}}>
                <Emoji emoji={this.props.emoji} native="true" size={20}></Emoji>
            </div>
        );


    }
}
;

export default connect(mapStateToProps, mapDispatchToProps)(EmojiDisplay);