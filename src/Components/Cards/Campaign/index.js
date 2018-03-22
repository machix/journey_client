import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Collapse} from 'react-collapse';


import agent from '../../../Helpers/agent';
import EmailAuth from './EmailAuth';
import PhoneAuth from './PhoneAuth';


const mapStateToProps = (state, ownProps) => ({
    console_id: state.common.consoleData.console_id,
    campaign: ownProps.campaign,
    isOpened: ownProps.isOpened,
    campaignSearch: state.common.campaignSearch,
    campaignMeta: ownProps.campaignMeta,
    campaignSearchValue: state.common.campaignSearchValue
});

const mapDispatchToProps = dispatch => ({
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
        dispatch(agent.FirebaseQuery.consoleEndpoint(key, type, dashboard, endpoint, bundle))
    },
    campaignSearchValueUpdate: (campaign) => {
        dispatch({
            type: 'CAMPAIGN_SEARCH_VALUE',
            campaign: campaign,
            value: ''
        })
    }

});

class GiftyGeneration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            emails: '',
            phone: ''
        }
    }

    assignDefault = (id) => {
        this.props.consoleEndpoint(this.props.console_id, 'assign_default', this.props.console_id, 'campaigns/' + this.props.campaign, id);
        this.props.campaignSearchValueUpdate(this.props.campaign);
    }


    searchMapper = function () {
        return Object.keys(this.props.campaignSearch[this.props.campaign]).map(function (key, index) {

            return (
                <div key={index}
                     onClick={() => this.assignDefault(this.props.campaignSearch[this.props.campaign][index]._id)}
                     className="pointer tag-default-search tag-pill">
                    {this.props.campaignSearch[this.props.campaign][index]._source.name} {this.props.campaignSearch[this.props.campaign][index]._source.price.display}
                </div>)
        }, this)


    }


    render() {
        return (
            <Collapse isOpened={this.props.isOpened}>
                <section className="list no-padding sub-section">

                    <div className="list-header">
                        <div className="header-copy">
                            <h3 className="header-title">Campaign Authorizations</h3>
														<span className="header-sub"> The devices below are authorized to generate Gifty's under this campaign!
														</span>
                        </div>
                        <div className="header-actions" style={{marginLeft: 'auto'}}>
                            <div className="header-action">

                            </div>
                        </div>
                    </div>

                    <div className="list-content">

                        {this.props.campaignMeta ? this.props.campaignMeta.type === 'email' || this.props.campaignMeta === 'public' ?
                            <EmailAuth campaign={this.props.campaign}
                                       campaignMeta={this.props.campaignMeta}
                                       campaignSearch={this.props.campaignSearch}
                                       campaignSearchValue={this.props.campaignSearchValue}/> :
                            <PhoneAuth campaign={this.props.campaign}
                                       campaignMeta={this.props.campaignMeta}
                                       campaignSearch={this.props.campaignSearch}/> : null }

                    </div>
                </section>
            </Collapse>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftyGeneration));
