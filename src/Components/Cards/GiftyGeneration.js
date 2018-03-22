import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../Helpers/agent';
import LinkDisplay from '../Other/LinkDisplay';

const mapStateToProps = state => ({
    ...state.common
});

const mapDispatchToProps = dispatch => ({
    generateLink: (key, dashboard) => dispatch(agent.FirebaseQuery.consoleEndpoint(key, 'link_create', dashboard, '/links'))
});


class GiftyGeneration extends Component {

    generateLink = (key) => {
        /*   agent.FirebaseQuery.consoleEndpoint(key, 'link_create', this.props.consoleData.vendor, '/links');*/
        this.props.generateLink(key, this.props.consoleData.console_id);
    }

    render() {

        const giftysMap = () => {
            return Object.keys(this.props.consoleData.giftys).map(function (key, index) {

                return (
                    <div key={index} className="list-row">
                        <div className="list-cell">
                            <span>{this.props.consoleData.giftys[key].lang.gift}</span>
                        </div>
                        <div className="list-cell">
                            <span>{this.props.consoleData.giftys[key].lang.description}</span>
                        </div>
                        <div className="list-cell">
                            <span>${parseFloat(Math.round(this.props.consoleData.giftys[key].price.stripe.cents) / 100).toFixed(2)}{this.props.consoleData.giftys[key].price.gst === true ? ' +gst' : null}</span>
                        </div>
                        <div className="list-cell medium">
                                <LinkDisplay key={key} name={key} index={index}/>
                        </div>
                        <div className="list-cell">
                            <div className="button button-small"
                                 onClick={() => this.generateLink(key, this.props.consoleData.console_id)}>Create
                            </div>
                        </div>
                    </div>)
            }, this);
        };

        return (
            <section className="list no-padding sub-section">
                <div className="content-section-header nodisplay">
                    <div className="header-content">
                        <h3><span>Send some Gifty's!</span></h3>
                        <div className="header-note">Giftys that others can send,
                            redeemable at your business.
                        </div>
                    </div>
                    <div className="header-action">
                        <div className="button button-small button-blue">+ New</div>
                    </div>
                </div>
                <div className="list-header">
                    <div className="header-copy">
                        <h3 className="header-title">Share happiness!</h3>
														<span className="header-sub"> Generate Gifty's on the fly below!
														</span>
                    </div>
                </div>

                <div className="list-content">
                    <div className="list-rows">
                        <div className="list-row list-row-header">
                            <div className="list-cell">
                                <span>Keyword</span>
                            </div>
                            <div className="list-cell long">
                                <span>Description</span>
                            </div>
                            <div className="list-cell">
                                <span>Price</span>
                            </div>
                            <div className="list-cell medium">
                                <span></span>
                            </div>
                            <div className="list-cell">
                                <span>Manage</span>
                            </div>
                        </div>

                        {
                            giftysMap()
                        }

                    </div>
                </div>
            </section>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftyGeneration));