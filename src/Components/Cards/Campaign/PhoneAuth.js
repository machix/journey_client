import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from '../../../Helpers/agent';
import AuthTags from './AuthTags';
import DefaultValue from './DefaultValue';

const mapStateToProps = (state, ownProps) => ({
    console_id: state.common.consoleData.console_id,
    campaign: ownProps.campaign,
    campaignSearch: state.common.campaignSearch,
    campaignMeta: ownProps.campaignMeta,
    campaignSearchValue: ownProps.campaignSearchValue
});

const mapDispatchToProps = dispatch => ({
    consoleEndpoint: (key, type, dashboard, endpoint, bundle) => {
        console.log(key, type, dashboard, endpoint, bundle);
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

class PhoneAuth extends Component {

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
            <div className="list-rows" style={{margin: '5px 0px 3px 0px'}}>
                <div className="list-row">
                    <div className="list-cell" style={{borderBottom: 'none'}}>
                        Phone Numbers:
                    </div>
                    <AuthTags type={'phone'}
                              tags={this.props.campaignMeta != null ? this.props.campaignMeta.phone : null}/>
                    <div className="list-cell medium conditional-display">
                        <DefaultValue campaign={this.props.campaign}
                                      campaignMeta={this.props.campaignMeta}/>
                    </div>
                </div>
                <div className="list-row-search conditional-nodisplay-desktop">
                    <div className="list-cell" style={{borderBottom: 'none'}}>
                        Authorized Value:
                    </div>
                    <div className="list-cell medium">
                        <DefaultValue campaign={this.props.campaign}
                                      campaignMeta={this.props.campaignMeta}/>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuth);
