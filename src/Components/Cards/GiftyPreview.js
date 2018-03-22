import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ProductEntry from '../Modals/ProductEntry';
import history from '../../Helpers/history';


const customStyles = {
    overlay: {
        zIndex: 100
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        border: 'none',
        backgroundColor: 'transparent'
    }
};

const defaultGifty = {
    "city" : null,     //Not updated currently
    "emojis" : [],
    "keyword" : null,
    "lang" : {
        "description" : null,
        "gift" : null,
        "gift_from" : null,
        "gift_short" : null,
        "how_to_redeem" : null
    },
    "popularity" : null,
    "price" : {
        "display" : null,
        "gst": true,
        "stripe" : {
            "all_fees_pct" : null,
            "application_fee" : null,
            "cents" : null,
            "currency" : null,
            "stripe_fee" : null
        }
    }
}


const mapStateToProps = state => ({
    ...state.common,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    updateGifty: (key,newGifty) =>
    {
        dispatch({
            type: 'UPDATE_GIFTY',
            key: key,
            editGifty: newGifty
        })
    },
    newGifty: (defaultGifty) =>
    {
        dispatch({
            type: 'UPDATE_GIFTY',
            key: null,
            editGifty: defaultGifty
        })
    },
    modalToggle: (value, child) =>
    {
        dispatch({
            type: 'MODAL_TOGGLE',
            value: value,
            child: child
        })
    }


});


class GiftyPreview extends Component {

    manageGifty = (key, giftyData) => {
        history.push('/giftys');
        this.props.updateGifty(key,giftyData);
        this.props.modalToggle('open', 'product_entry');
    }

    newGifty = () => {
        history.push('/giftys');
        this.props.newGifty(defaultGifty);
        this.props.modalToggle('open', 'product_entry');
    }

    test = (gifty) => {
        return <ProductEntry gifty={gifty}></ProductEntry>
    }

    giftysMap = () => {
        return Object.keys(this.props.consoleData.giftys).map(function (key, index) {

            return (

                <div key={index} className="list-row  no-select" onClick={() => this.manageGifty(key, this.props.consoleData.giftys[key])}>

                    <div className="list-cell short">
                        <span>{this.props.consoleData.giftys[key].lang.gift}</span>
                    </div>
                    <div className="list-cell long">
                        <span>{this.props.consoleData.giftys[key].lang.description}</span>
                    </div>
                    <div className="list-cell short">
                        <span>${parseFloat(Math.round(this.props.consoleData.giftys[key].price.stripe.cents) / 100).toFixed(2)}{this.props.consoleData.giftys[key].price.gst === true ? ' +gst' : null}</span>
                    </div>
                    <div className="list-cell conditional-nodisplay-mobile short">
                        <span>{this.props.consoleData.giftys[key].popularity}</span>
                    </div>
                    <div className="list-cell conditional-nodisplay-mobile">
                        <div className="button button-small"
                             onClick={() => this.manageGifty(key, this.props.consoleData.giftys[key])}>Manage
                        </div>
                    </div>
                </div>)
        }, this);
    };

    render() {
        return (
            <div>

                <section className="list no-padding">
                    <div className="content-section-header nodisplay">
                        <div className="header-content">
                            <h3><span>Your Giftys</span></h3>
                            <div className="header-note">Giftys that others can send,
                                redeemable at your business.
                            </div>
                        </div>
                        <div className="header-action">
                            <div  className="button button-small button-blue">+ New</div>
                        </div>
                    </div>

                    <div className="list-header list-header-left">
                        <div className="header-copy">
                            <h3 className="header-title">By Gifty</h3>
														<span
                                                            style={{maxWidth: '80%'}}
                                                            className="header-sub">Giftys that others can send, redeemable at your business.
														</span>
                        </div>

                        <div className="header-actions">
                            <div className="header-action">
                                <div onClick={() => this.newGifty()} className="button button-small button-blue">+ New
                                    Gifty
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="list-content">
                        <div className="list-rows">
                            <div className="list-row list-row-header">
                                <div className="list-cell short">
                                    <span>Keyword</span>
                                </div>
                                <div className="list-cell long">
                                    <span>Description</span>
                                </div>
                                <div className="list-cell short">
                                    <span>Price</span>
                                </div>
                                <div className="list-cell conditional-nodisplay-mobile short">
                                    <span>Popularity</span>
                                </div>
                                <div className="list-cell conditional-nodisplay-mobile">
                                    <span>Manage</span>
                                </div>
                            </div>
                            {this.props.consoleData.giftys ? this.giftysMap() :
                                <div className="list-row  no-select is-disabled">
                                    <div className="list-cell short">
                                        <span>...</span>
                                    </div>
                                    <div className="list-cell long">
                                        <span>...</span>
                                    </div>
                                    <div className="list-cell short">
                                        <span>...</span>
                                    </div>
                                    <div className="list-cell conditional-nodisplay-mobile short">
                                        <span>...</span>
                                    </div>
                                    <div className="list-cell conditional-nodisplay-mobile">
                                        ...
                                    </div>
                                </div>}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftyPreview));

/* <Modal
 isOpen={this.state.modalIsOpen}
 onRequestClose={this.closeModal}
 style={customStyles}
 >
 <ProductEntry ></ProductEntry>
 </Modal>*/