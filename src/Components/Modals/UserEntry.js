import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'

import agent from '../../Helpers/agent';
/*
 import InputContent from './ModalHelpers/InputContent.js';
 */

const mapStateToProps = (state) => {
    return {
        ...state.businessReducer,

    }
};


const mapDispatchToProps = dispatch => ({
    changeHandler: (newProduct, key) => {
        dispatch({type: 'UPDATE_GIFTY', editGifty: newProduct, key})
    },
    submit: (key1, dashboard, editGifty) =>
        dispatch(agent.FirebaseQuery.updateGifty(key1, dashboard, editGifty))

})

class UserEntry extends Component {


    submit = () => {
        this.props.submit(this.props.key1, this.props.dashboard, this.props.editGifty);
    }


    changeHandler = (event, field) => {
        var newProduct;
        if (field === 'gst') {
            newProduct = update(this.props.editGifty, {price: {[field]: {$set: event.target.checked}}});
        } else if (field === 'price') {
            newProduct = update(this.props.editGifty, {price: {stripe: {cents: {$set: event.target.value * 100}}}});
        } else {
            newProduct = update(this.props.editGifty, {lang: {[field]: {$set: event.target.value}}});
        }
        this.props.changeHandler(newProduct, this.props.key1);
    }

    render() {
        return (
            <div className="modal-main">
                <div className="modal-content content">
                    <div className="form-wrapper">
                        <div className="form-content">
                            <div className="holder">

                            </div>
                            <form onSubmit={() => this.submit()}>
                                <div className="component">
                                    <div className="title">
                                        <h1 className="h2-modal">Email:</h1>
                                    </div>
                                    <div className="sub-header">
                                        <h2>
                                            <input autoFocus={true} className="block-value"/>
                                        </h2>
                                    </div>
                                </div>


                                <button type="submit" className="nodisplay"></button>


                            </form>
                        </div>
                    </div>
                    <div className="submit-bar" onClick={() => this.submit()}>
                        <div className="submit">Enter</div>

                    </div>

                </div>

            </div>


        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEntry);
