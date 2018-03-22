import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker} from 'emoji-mart-lite';
import update from 'immutability-helper';
import ReactTooltip from 'react-tooltip';
import Icon from 'react-icon-base';

import Waypoint from 'react-waypoint';
import scrollIntoView from 'scroll-into-view';
import VisibilitySensor from 'react-visibility-sensor';

import agent from '../../Helpers/agent';
import '../Other/emoji-mart.css';

import EmojiList from './ModalHelpers/EmojiList';

/*
 import InputContent from './ModalHelpers/InputContent.js';
 */

const mapStateToProps = (state) => {
    return {
        ...state.businessReducer,
        gst: state.businessReducer.editGifty.price.gst,
        key1: state.businessReducer.editGiftyKey,
        dashboard: state.common.consoleData.console_id,
        dollars: state.businessReducer.editGifty.price.stripe.dollars,
        gstPercent: state.businessReducer.editGifty.price.stripe.gst_percent
    }
};


class NumericInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0
        };
    }

    _handleUpdate(e) {
        if (e.target.validity.valid) {
            this.setState({inputValue: e.target.value});
        }
    }

    render() {
        return (
            <div>
                <input type="number" value={this.props.inputValue} onChange={this.props.handleChange} step="0.01"/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeHandler: (newProduct, key) => {
        dispatch({type: 'UPDATE_GIFTY', editGifty: newProduct, key})
    },
    submit: (key1, dashboard, editGifty) =>
        dispatch(agent.FirebaseQuery.updateGifty(key1, dashboard, editGifty))

})

class ProductEntry extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentVisible: 0,
            //issue with the react-visibility
            initialRender: true,
            direction: '',
            lastScrollPos: 0,
        };


        this.giftPriceNode = (node, value) => {
            if (node) {
                this[value] = node
            }
        }

    }


    addEmoji = (emoji, event) => {
        event.preventDefault();
        if (this.props.editGifty.emojis.length > 4) {
            var newProduct = update(this.props.editGifty, {emojis: {$push: [emoji.colons]}});
            newProduct.emojis.shift();
            this.props.changeHandler(newProduct, this.props.key1);

        } else {
            var newProduct = update(this.props.editGifty, {emojis: {$push: [emoji.colons]}});
            this.props.changeHandler(newProduct, this.props.key1);
        }
    }

    countDecimals = function (value) {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1].length || 0;
    }

    submit = (e) => {
        console.log('submitted');
        console.log(e);
        e.preventDefault();
        if (e.keyCode == 13) {
            console.log('backspace');
        }

        /*Make sure that GST is toFixed(2)*/
        var newProduct1;
        newProduct1 = update(this.props.editGifty, {price: {stripe: {gst_percent: {$set: parseFloat(this.props.editGifty.price.stripe.gst_percent).toFixed(2)}}}});
        this.props.submit(this.props.key1, this.props.dashboard, newProduct1);
    }


    changeHandler = (event, field) => {
        event.preventDefault();
        if (event.key === 'Enter') {
            event.preventDefault();
            this.goToNext(this.state.currentVisible + 1);
        } else {
            var newProduct;
            if (field === 'gst') {
                newProduct = update(this.props.editGifty, {price: {[field]: {$set: event.target.checked}}});
            } else if (field === 'price') {
                if (event.target.validity.valid && this.countDecimals(event.target.value) < 3) {
                    newProduct = update(this.props.editGifty, {price: {stripe: {dollars: {$set: event.target.value}}}});
                } else {
                    return;
                }
            } else if (field === 'gst_percent') {
                if (event.target.validity.valid && event.target.value > 0) {
                    newProduct = update(this.props.editGifty, {price: {stripe: {gst_percent: {$set: event.target.value}}}});
                } else {
                    newProduct = update(update(this.props.editGifty, {price: {stripe: {gst_percent: {$set: 0}}}}), {price: {gst: {$set: false}}})


                }
            } else {
                newProduct = update(this.props.editGifty, {lang: {[field]: {$set: event.target.value}}});
            }

        }


        this.props.changeHandler(newProduct, this.props.key1);
    }

    addProduct = () => {
        if (this.props.newProduct.giftName === '' || this.props.newProduct.giftPrice === '' || this.props.newProduct.giftPhrase === '') {
            this.setState({
                ...this.state,
                details: true
            })
        } else {
            /*            demop
             console.log(this.props.products)
             const newProducts = this.props.products.concat([newProduct]);
             console.log('this is from addProduct');
             console.log(newProducts);
             this.props.addProduct(newProducts);
             this.setState({
             emojiView: false,
             formVisible: true,
             details: false
             })*/
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.goToNext(e, this.state.currentVisible + 1)
        }
    }

    visibility = (e, value) => {
        console.log(e);
        console.log('current visible: ', value)
        if (e === true) {
            this.setState({
                ...this.state,
                currentVisible: value,
                initialRender: this.state.initialRender++
            })
        }

    }

    goToPrev = (event, value) => {
        event.stopPropagation();
        scrollIntoView(this[value], {
            align: {
                topOffset: 100
            }
        });
    }
    goToNext = (event, value) => {
        event.stopPropagation();
        scrollIntoView(this[value], {
            align: {
                topOffset: [this.state.currentVisible === 3 ? 0 : 100]
            }
        });
    }

    enterWaypoint = (value) => {

        /*On initial Render, direction === ''*/
        if (this.state.direction === '') {

        } else if (this.state.direction === 'up') {
            if (value != 4) {
                this['input' + (value)].focus();
            }
            this.setState({
                ...this.state,
                currentVisible: value
            })
        } else {
            /*When you are scrolling down, you want the followig behavior*/

        }

        console.log('waypointEnter', value);
        /* if (this.state.scrolling === "down" && value === 4) {
             this.setState({
                 ...this.state,
                 currentVisible: 4,
                 scrolling: "up",
                 lastVisible: 4
             })
         } else if (this.state.scrolling === "up" && value === 0) {
             this.setState({
                 ...this.state,
                 currentVisible: 0,
                 scrolling: "down",

             })
         } else if (this.state.scrolling === "up") {

             this.setState({
                 ...this.state,
                 currentVisible: value,
                 lastVisible: value + 1
             })
         }*/


    }

    leaveWaypoint = (value) => {
        /*On initial Render, direction === ''*/
        if (this.state.direction === '') {

        } else if (this.state.direction === 'up') {

        } else {
            if (value !== 3 && value !== 4) {
                this['input' + (value + 1)].focus();
            }

            this.setState({
                ...this.state,
                currentVisible: value + 1
            })

        }
        console.log('waypoint leave', value)
        /*   if (this.state.scrolling === "up" && this.state.lastVisible === 1) {
               this.setState({
                   ...this.state,
                   currentVisible: 0,
                   scrolling: "down"
               })
           } else if (this.state.scrolling === "down" && value === 3) {
               this.setState({
                   ...this.state,
                   currentVisible: value + 1,
                   lastVisible: value,
                   scrolling: "up"
               })
           } else if (this.state.scrolling === "down") {
               this.setState({
                   ...this.state,
                   currentVisible: value + 1,
                   lastVisible: value
               })
           }*/

    }


    handleScroll(event) {

        if (this.state.lastScrollPos > event.currentTarget.scrollTop) {
            console.log('up');
            this.setState({
                ...this.state,
                direction: 'up',
                lastScrollPos: event.currentTarget.scrollTop
            });
        } else if (this.state.lastScrollPos < event.currentTarget.scrollTop) {
            console.log('down');
            this.setState({
                ...this.state,
                direction: 'down',
                lastScrollPos: event.currentTarget.scrollTop
            });
        }
    }

    render() {
        var onChange = function (isVisible) {
            /*
                        console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
            */
        };


        return (
            <div className="modal-main ">
                <div className="modal-content content">
                    <div style={{height: '100vh'}}>
                        <div className="form-wrapper" ref={(e) => this.giftPriceNode(e, "wrapper")}
                             onScroll={(e) => this.handleScroll(e)}>
                            <div className="form-content">
                                <div className="holder">
                                </div>
                                <Waypoint
                                    onEnter={() => this.enterWaypoint(0)}
                                    onLeave={() => this.leaveWaypoint(0)}
                                    scrollableAncestor={this.wrapper}
                                    topOffset={'45%'}
                                    bottomOffset={0}
                                >
                                    <div
                                        className={this.state.currentVisible === 0 ? "component" : "component is-disabled"}
                                        ref={(e) => this.giftPriceNode(e, 0)}>
                                        <div className="title">
                                            <h1 className="h2-modal">Gift Name:</h1>
                                        </div>
                                        <div className="sub-header">
                                            <h2>
                                                <input autoFocus={this.state.currentVisible === 0}
                                                       placeholder=""
                                                       onKeyPress={this._handleKeyPress}
                                                       ref={(e) => this.giftPriceNode(e, "input0")}/>
                                            </h2>
                                        </div>
                                    </div>

                                </Waypoint>
                                <Waypoint
                                    onEnter={() => this.enterWaypoint(1)}
                                    onLeave={() => this.leaveWaypoint(1)}
                                    scrollableAncestor={this.wrapper}
                                    topOffset={'45%'}
                                    bottomOffset={100}
                                >
                                    <div
                                        className={this.state.currentVisible === 1 ? "component" : "component is-disabled"}
                                        ref={(e) => this.giftPriceNode(e, 1)}>
                                        <div className="component">
                                            <div className="title">
                                                <h1 className="h2-modal">Description:</h1>
                                            </div>
                                            <div className="sub-header">
                                                <h2>
                                        <textarea type="text" name="description" id="description"
                                                  rows="3"
                                                  placeholder="Description"
                                                  value={this.props.editGifty.lang.description}
                                                  onChange={(e) => this.changeHandler(e, 'description')}
                                                  onKeyPress={this._handleKeyPress}
                                                  autoFocus={this.state.currentVisible === 1}
                                                  ref={(e) => this.giftPriceNode(e, "input1")}
                                        />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Waypoint>
                                <Waypoint
                                    onEnter={() => this.enterWaypoint(2)}
                                    onLeave={() => this.leaveWaypoint(2)}
                                    scrollableAncestor={this.wrapper}
                                    topOffset={'45%'}>
                                    <div
                                        className={this.state.currentVisible === 2 ? "component" : "component is-disabled"}
                                        ref={(e) => this.giftPriceNode(e, 2)}>
                                        <div className="component">
                                            <div className="title">
                                                <h1 className="h2-modal">Gift Price:</h1>
                                            </div>

                                            <div className="sub-header">
                                                <h2>
                                                    <input type="number" step="0.01" name="product[Price]" id="Price"
                                                           placeholder="5.00"
                                                           onChange={(e) => this.changeHandler(e, 'price')}
                                                           value={this.props.dollars}
                                                           onKeyPress={this._handleKeyPress}
                                                           autoFocus={this.state.currentVisible === 2}
                                                           ref={(e) => this.giftPriceNode(e, "input2")}
                                                    />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Waypoint>
                                <Waypoint
                                    onEnter={() => this.enterWaypoint(3)}
                                    onLeave={() => this.leaveWaypoint(3)}
                                    scrollableAncestor={this.wrapper}
                                    topOffset={'45%'}>
                                    <div
                                        className={this.state.currentVisible === 3 ? "component" : "component is-disabled"}>
                                        <div className="component" ref={(e) => this.giftPriceNode(e, 3)}>
                                            <div className="title">
                                                <h1 className="h2-modal">GST Included?</h1>
                                            </div>
                                            <div className="sub-header">
                                                <h2>
                                                    <input type="number" step="0.01" name="product[Price]" id="Price"
                                                           placeholder="5.00"
                                                           onChange={(e) => this.changeHandler(e, 'price')}
                                                           value={this.props.dollars}
                                                           onKeyPress={this._handleKeyPress}
                                                           autoFocus={this.state.currentVisible === 3}
                                                           ref={(e) => this.giftPriceNode(e, "input3")}
                                                    />
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Waypoint>
                                <Waypoint
                                    onEnter={() => this.enterWaypoint(4)}
                                    onLeave={() => this.leaveWaypoint(4)}
                                    scrollableAncestor={this.wrapper}
                                    topOffset={'45%'}
                                >
                                    <div
                                        className={this.state.currentVisible === 4 ? "component" : "component is-disabled"}>
                                        <div className="component" ref={(e) => this.giftPriceNode(e, 4)}>
                                            <div className="title">
                                                <h1 className="h2-modal">Please pick 5 Emojis to be Associated with Your
                                                    Gift</h1>
                                            </div>
                                            <div className="sub-header">
                                                <EmojiList></EmojiList>
                                                <Picker color="#63C146" native={true}
                                                        exclude={['recent']} title="pick yours"
                                                        onClick={this.addEmoji}/>
                                            </div>
                                        </div>
                                    </div>
                                </Waypoint>


                                <button type="submit" className="nodisplay"></button>
                            </div>
                        </div>
                        <div className="submit-bar">
                            <div className="nav-buttons"
                                 onClick={(e) => this.goToPrev(e, this.state.currentVisible - 1)}>&#60; </div>
                            <div className="nav-buttons"
                                 onClick={(e) => this.goToNext(e, this.state.currentVisible + 1)}>&#62;</div>
                            <div className="submit">Enter</div>
                        </div>
                    </div>

                </div>


            </div>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductEntry);


/*
 <section className="list no-padding product-entry">

                        <div className="list-content">
                            <div className="list-rows">
                                <div className="list-row list-row-header">

                                    <div className="list-cell long" style={{textAlign: 'center'}}>
                                        <span>Gift Name </span>
                                        <span style={{verticalAlign: 'text-bottom'}}><a data-tip
                                                                                        data-for="name">
                                            <Icon
                                                viewBox="0 0 40 40">
                                                <g>
                                                    <path
                                                        d="m18.4 15v-3.4h3.2v3.4h-3.2z m1.6 18.4c7.3 0 13.4-6.1 13.4-13.4s-6.1-13.4-13.4-13.4-13.4 6.1-13.4 13.4 6.1 13.4 13.4 13.4z m0-100c9.2 0 16.6 7.4 16.6 16.6s-7.4 16.6-16.6 16.6-16.6-7.4-16.6-16.6 7.4-16.6 16.6-16.6z m-1.6 25v-10h3.2v10h-3.2z"/>
                                                </g>
                                            </Icon>
                                        </a></span>
                                    </div>
                                </div>
                                <ReactTooltip place="top" id='name' type='dark' effect="float">
                                    <div className="react-tooltip">Your name is exactly what Gifty users <br/>
                                        will use to purchase your Gifty and find more information!
                                        <br/>
                                        <br/> Think of something descriptive and creative!
                                        <br/>
                                    </div>
                                </ReactTooltip>
                                <div className="list-row">
                                    <div className="list-cell">
                                        <input type="text" name="Gift" id="Gift"
                                               placeholder="Gift Name"
                                               value={this.props.editGifty.lang.gift}
                                               onChange={(e) => this.changeHandler(e, 'gift')}/>
                                    </div>
                                </div>
                                <div className="list-row list-row-header">

                                    <div className="list-cell long" style={{textAlign: 'center'}}>
                                        <span>Description</span> <span style={{verticalAlign: 'text-bottom'}}><a
                                        data-tip data-for="description"> <Icon
                                        viewBox="0 0 40 40">
                                        <g>
                                            <path
                                                d="m18.4 15v-3.4h3.2v3.4h-3.2z m1.6 18.4c7.3 0 13.4-6.1 13.4-13.4s-6.1-13.4-13.4-13.4-13.4 6.1-13.4 13.4 6.1 13.4 13.4 13.4z m0-100c9.2 0 16.6 7.4 16.6 16.6s-7.4 16.6-16.6 16.6-16.6-7.4-16.6-16.6 7.4-16.6 16.6-16.6z m-1.6 25v-10h3.2v10h-3.2z"/>
                                        </g>
                                    </Icon></a></span>
                                    </div>
                                </div>
                                <ReactTooltip place="top" id='description' type='dark' effect="float">
                                    <div className="react-tooltip">This description will help Gifty users <br/>
                                        determine just how AMAZING your Gifty is. <br/>
                                        <br/>
                                        Amazing, right?
                                    </div>
                                </ReactTooltip>
                                <div className="list-row">
                                    <div className="list-cell no-padding">
                                        <textarea type="text" name="Gift" id="Gift"
                                                  rows="3"
                                                  placeholder="Description"
                                                  value={this.props.editGifty.lang.description}
                                                  onChange={(e) => this.changeHandler(e, 'description')}/>
                                    </div>
                                </div>
                                <div className="list-header" style={{display: 'block'}}>
                                    <div className="header-copy">
                                        <div style={{display: 'inline-block'}}>
                                            <h3 className="header-title">Price</h3>
                                        </div>
                                        <div style={{display: 'inline-block'}}>
                                            <div className="hidden_input_wrapper">
                                                <div className="hidden_input_addition">$</div>
                                                <input type="number" step="0.01" name="product[Price]" id="Price"
                                                       placeholder="5.00"
                                                       onChange={(e) => this.changeHandler(e, 'price')}
                                                       value={this.props.dollars}
                                                />
                                            </div>
                                        </div>

                                        <div style={{display: 'inline-block', marginLeft: '20px'}}>
                                            <div className="no-border" style={{display: 'inline-block'}}>
                                                <h3 style={{whiteSpace: 'nowrap'}} className="hidden_input_addition">
                                                    GST incl?
                                                </h3>
                                            </div>
                                        </div>
                                        <div style={{display: 'inline-block'}}>

                                            <input
                                                className=""
                                                onChange={(e)=>this.changeHandler(e, 'gst')}
                                                type="checkbox"
                                                checked={this.props.gst}/>
                                        </div>
                                        {this.props.gst === true ? <div style={{display: 'inline-block'}}>
                                            <div style={{display: 'inline-block'}}>
                                                <input type="number"
                                                       style={{width: '5ch'}}
                                                       step="1"
                                                       placeholder="1"
                                                       onChange={(e) => this.changeHandler(e, 'gst_percent')}
                                                       value={this.props.gstPercent}
                                                /></div>
                                            <div style={{display: 'inline-block'}}>%</div>
                                        </div> : null}
                                    </div>
                                </div>
                                <div className="list-header" style={{display: 'block'}}>
                                    <div className="header-copy">
                                        <h3 className="header-title">Emojis</h3>
 <span className="header-sub">Please pick 5 emojis associated with your Gifty!
 </span>
                                    </div>
                                </div>
                                <div >
                                    <EmojiList></EmojiList>
                                </div>
                                <div className="list-header">
                                    <Picker style={{width: '100%'}} color="#63C146" native={true}
                                            exclude={['recent']} title="pick yours" onClick={this.addEmoji}/>
                                </div>
                                <div className="list-row">
                                    <div className="list-cell">
                                        <div onClick={this.submit} className="button button-small button-blue">Save
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>*/