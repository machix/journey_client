import React, {Component} from 'react';
import {connect} from 'react-redux';
import update from 'immutability-helper'
import ScrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import VisibilitySensor from 'react-visibility-sensor';

import agent from '../../Helpers/agent';
/*
 import InputContent from './ModalHelpers/InputContent.js';
 */

const mapStateToProps = (state) => {
};


const mapDispatchToProps = dispatch => ({})

class Form extends Component {
    constructor() {
        super();
        this.state = {
            active: 0,
            numberChildren: 0
        }
    }


    componentWillMount() {
        //    Count the number of children
        let numChildren = React.Children.count(this.props.children);
        console.log(numChildren);
        console.log('form');
        console.log(this.props.children);
        this.setState({
            ...this.state,
            numberChildren: numChildren
        })

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
        const formComponentWrapper = React.Children.map(this.props.children, child => {
            return (
                <ScrollIntoViewIfNeeded>
                    <VisibilitySensor>
                        <div className="formEntry">{child}</div>
                    </VisibilitySensor>
                </ScrollIntoViewIfNeeded>
            );
        });


        return (
            <div className="form-wrapper">
                {this.props.children}
            </div>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form);
