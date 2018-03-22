import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

import Icon from 'react-icon-base';

import agent from '../../../Helpers/agent';
import AuthTags from './AuthTags';
import AuthSearch from './AuthSearch';

const mapStateToProps = (state, ownProps) => ({
    console_id: state.common.consoleData.console_id,
    campaign: ownProps.campaign,
    campaignSearch: state.common.campaignSearch,
    campaignMeta: ownProps.campaignMeta,
    campaignSearchValue: ownProps.campaignSearchValue
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

class EmailAuth extends Component {

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
            <div>
                <div className="list-rows" style={{margin: '5px 0px 3px 0px'}}>

                    <div className="list-row-search ">
                        <div className="list-cell" style={{borderBottom: 'none'}}>
                            E-mails:
                        </div>
                        <AuthTags type={'email'} campaign={this.props.campaign} key={this.props.campaign}
                                  tags={this.props.campaignMeta != null ? this.props.campaignMeta.emails : null}/>

                        <div className="list-cell medium conditional-display">
                            <AuthSearch campaign={this.props.campaign}
                                        campaignMeta={this.props.campaignMeta}/>
                        </div>
                    </div>
                    <div className="list-row-search conditional-nodisplay-desktop">
                        <div className="list-cell" style={{borderBottom: 'none'}}>
                            Default Gifty <Icon viewBox="0 0 40 40" size={20} style={{marginBottom: '2px'}}>
                            <g>
                                <path
                                    d="m15.9 23.4c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5-7.5 3.3-7.5 7.5 3.3 7.5 7.5 7.5z m10 0l8.2 8.2-2.5 2.5-8.2-8.2v-1.4l-0.5-0.4c-1.9 1.6-4.4 2.5-7 2.5-6.1 0-10.9-4.7-10.9-10.7s4.8-10.9 10.9-10.9 10.7 4.8 10.7 10.9c0 2.6-0.9 5.1-2.5 7l0.4 0.5h1.4z"/>
                            </g>
                        </Icon> :
                        </div>
                        <div className="list-cell medium" style={{borderBottom: 'none'}}>
                            <AuthSearch campaign={this.props.campaign}
                                        campaignMeta={this.props.campaignMeta}/>
                        </div>
                    </div>
                </div>
                <div className="list-rows"  style={{margin: '5px'}}>
                    <div className="list-row-search">
                        <div className="tag-list search">
                            <CSSTransitionGroup
                                transitionName="test"
                                transitionEnterTimeout={50}
                                transitionLeaveTimeout={200}>
                                {this.props.campaignSearch[this.props.campaign] && this.props.campaignSearchValue[this.props.campaign] !== '' ? this.searchMapper() : null  }
                            </CSSTransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmailAuth);
