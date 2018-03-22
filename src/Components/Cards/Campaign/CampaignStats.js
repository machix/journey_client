import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Collapse} from 'react-collapse';


import CustomizedAxisTick from '../../../Helpers/customizedAxisTick';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import agent from '../../../Helpers/agent';
import CampaignSearch from './CampaignGiftyGeneration';
import CampaignAuthorization from './'

const mapStateToProps = (state, ownProps) => ({
    stats: state.common.stats,
    campaign: ownProps.campaign,
    chartData: state.common.chartData,
    campaignMeta: state.common.campaignMeta
});

const mapDispatchToProps = dispatch => ({
    campaignMetaFunction: (campaign) => dispatch(agent.FirebaseQuery.campaignMeta(campaign))
});


class CampaignStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        }
    }

    componentWillMount() {
        this.props.campaignMetaFunction(this.props.campaign);
    }

    toggle() {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    deleteCampaign() {
        if (window.confirm('Are you sure you would like to delete the campaign: ' + this.props.campaignMeta[this.props.campaign].name + '?') === true) {

        }
    }

    render() {
        const {isOpened} = this.state;

        return (
            <section className="analytics">
                <div className="list-header no-select" onClick={()=>this.toggle()}>
                    <div className="header-copy-campaign">
                        <h4 style={{display: 'inline-block'}}
                            className="header-title no-select"> {this.props.campaignMeta != null ? (this.props.campaignMeta[this.props.campaign] ? this.props.campaignMeta[this.props.campaign].name : null) : null}</h4>

                        <span style={{fontSize: '12px'}}
                              className="uppercase"> &nbsp;  {this.props.campaignMeta != null ? (this.props.campaignMeta[this.props.campaign] ? ' (' + this.props.campaignMeta[this.props.campaign].type + ')' : null) : null}
                        </span>
                    </div>
                    <div className="list-header-close" onClick={()=>this.deleteCampaign(this.props.campaign)}>
                        <svg viewBox="0 0 12 12">
                            <path fillRule="evenodd"
                                  d="M11.53.47a.75.75 0 0 0-1.061 0l-4.47 4.47L1.529.47A.75.75 0 1 0 .468 1.531l4.47 4.47-4.47 4.47a.75.75 0 1 0 1.061 1.061l4.47-4.47 4.47 4.47a.75.75 0 1 0 1.061-1.061l-4.47-4.47 4.47-4.47a.75.75 0 0 0 0-1.061z"></path>
                        </svg>
                    </div>
                </div>
                <Collapse isOpened={isOpened} forceInitialAnimation={false}>
                    <div className="analytics-tabs">
                        <div className="tab">
                            <div className="tab-title">Sent</div>
                            <div
                                className="tab-subtitle">{this.props.stats[this.props.campaign] ? this.props.stats[this.props.campaign].total : null }</div>
                        </div>

                        <div className="tab">
                            <div className="tab-title">Redeemed</div>
                            <div
                                className="tab-subtitle">{this.props.stats[this.props.campaign] ? (this.props.stats[this.props.campaign].total === 0 ? 0 : Math.round(this.props.stats[this.props.campaign].redeemed / this.props.stats[this.props.campaign].total * 100)) : null}%
                            </div>
                        </div>

                        <div className="tab nodisplay">
                            <div className="tab-title">Reach</div>
                            <div className="tab-subtitle">+ {/*this.props.stats[this.props.campaign].total*/}</div>
                        </div>
                    </div>

                    <div className="analytics-chart">
                        <div className="line-chart-container" style={{padding: '40px 0px 36px 0px'}}>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart margin={{ top: 20, right: 50, left: 0, bottom: 0 }}
                                           data={this.props.chartData[this.props.campaign]}>
                                    <Line type='monotone' dataKey='Sent' stroke='#8884d8' strokeWidth={2}/>
                                    <XAxis dataKey="name" tick={<CustomizedAxisTick/>}/>
                                    <YAxis domain={[1, 'dataMax']} interval={1}/>
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </Collapse>

                <CampaignAuthorization
                    campaign={this.props.campaign}
                    campaignMeta={this.props.campaignMeta != null ? this.props.campaignMeta[this.props.campaign] : null}
                    isOpened={this.state.isOpened}/>

            </section>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignStats));
