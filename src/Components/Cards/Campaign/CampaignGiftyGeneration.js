import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Collapse} from 'react-collapse';
import {Emoji} from 'emoji-mart-lite';

import agent from '../../../Helpers/agent';
import EmojiCategories from './EmojiCategories';


const mapStateToProps = (state, ownProps) => ({
    ...state.common,
    isOpened: ownProps.isOpened

});

const mapDispatchToProps = dispatch => ({
    generateLink: (key, dashboard) => dispatch(agent.FirebaseQuery.consoleEndpoint(key, 'link_create', dashboard, '/links'))
});


class GiftyGeneration extends Component {


    render() {
        return (
            <Collapse isOpened={this.props.isOpened}>

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
                            <h3 className="header-title">Deploy Gifty's</h3>
														<span className="header-sub">Generate and Send Gifty's under this Campaign!
														</span>
                        </div>
                    </div>
                    <div className="list-header">
                        <div className="header-copy">
                            <h3 className="header-title">Browse Our Participating Vendors: </h3>
                            <select>
                                <option value="Rosso">Rosso</option>
                                <option value="lime">Bosso</option>
                            </select>
                        </div>
                        <div className="pointer top-link" style={{marginLeft: 'auto'}}>
                            <Emoji emoji=':santa::skin-tone-3:' native="true" size={20}/>
                            <div className="top-link-tooltip">
                                <div className="pointer top-link-tooltip-label">Or... Search with Emojis!</div>
                            </div>
                        </div>

                    </div>

                    <div className="list-content">
                        <div className="list-rows">
                            <div className="list-row list-row-header">
                                <div className="list-cell" style={{textAlign: 'left'}}>
                                    <span>Your Categories</span>
                                </div>
                            </div>


                            <div className="list-row">
                                <EmojiCategories tags={[ ":sweat_smile:", ":joy:"]}></EmojiCategories>

                            </div>

                        </div>


                    </div>
                </section>
            </Collapse>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftyGeneration));

/*  <div className="list-row">
 <div className="list-cell">
 <span>test</span>
 </div>
 <div className="list-cell">
 <span>test</span>
 </div>
 <div className="list-cell">
 <span>test</span>
 </div>
 <div className="list-cell medium">


 </div>
 <div className="list-cell">
 <div className="button button-small"
 onClick={() => {}}>Create
 </div>
 </div>
 </div>*/