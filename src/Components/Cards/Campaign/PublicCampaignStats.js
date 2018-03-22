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
    console_id: state.common.consoleData.console_id,
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
            isOpened: false,
        }
    }

    componentWillMount() {
        this.props.campaignMetaFunction(this.props.console_id + '_public');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    toggle() {
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    render() {
        const {isOpened} = this.state;
        let publicCampaign = this.props.console_id + '_public';
        console.log(publicCampaign);

        return (
            <section className="analytics">
                <div className="list-header no-select" onClick={()=>this.toggle()}>
                    <div className="header-copy-campaign">
                        <h4 style={{display: 'inline-block'}}
                            className="header-title no-select"> Your Public Campaign </h4>

                        <span style={{fontSize: '12px'}}
                              className=""> &nbsp;
                            Statistics for all unassigned users will show up here!
                        </span>

                    </div>
                </div>
                <Collapse isOpened={isOpened} forceInitialAnimation={false}>
                    <div className="analytics-tabs">
                        <div className="tab">
                            <div className="tab-title">Sent</div>
                            <div
                                className="tab-subtitle">{this.props.stats[publicCampaign] ? this.props.stats[publicCampaign].total : 0 }</div>
                        </div>

                        <div className="tab">
                            <div className="tab-title">Redeemed</div>
                            <div
                                className="tab-subtitle">{this.props.stats[publicCampaign] ? (this.props.stats[publicCampaign].total === 0 ? 0 : Math.round(this.props.stats[publicCampaign].redeemed / this.props.stats[publicCampaign].total * 100)) : 0}%
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
                                           data={this.props.chartData[publicCampaign]}>
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
                    campaign={publicCampaign}
                    campaignMeta={this.props.campaignMeta != null ? 'public' : null}
                    isOpened={this.state.isOpened}/>
            </section>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignStats));
