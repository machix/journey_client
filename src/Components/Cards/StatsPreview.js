import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import agent from '../../Helpers/agent';

import CustomizedAxisTick from '../../Helpers/customizedAxisTick';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

import PercentageChange from '../Other/PercentageChange';
const mapStateToProps = state => ({
    stats: state.common.stats,
    aggregateStats: state.common.aggregateStats,
    chartData: state.common.chartData,
    aggregateChartData: state.common.aggregateChartData
});

const mapDispatchToProps = dispatch => ({
/*    fetchChartData: (agreement, startDate, endDate) => dispatch(agent.FirebaseQuery.updateChartData(agreement, null, startDate, endDate)),*/
    aggregateData: (chartData, stats) => dispatch(agent.FirebaseQuery.aggregateData(chartData, stats))
});


class StatsPreview extends Component {

    shouldAggregate = (chartData) => {
        if (Object.keys(chartData).length === 0 && chartData.constructor === Object) {
            return false
        } else {
            let maxLength = 0;
            let minLength = 100000;

            Object.keys(chartData).map((key, index) => {

                if (chartData[key].length >= maxLength) {
                    maxLength = chartData[key].length;
                }
                if (chartData[key].length <= minLength) {
                    minLength = chartData[key].length;
                }
            })

            return maxLength === minLength;
        }
    };

    componentWillMount() {

        /*Check if all the Campaigns have updated to the same Time Interval before calling Aggregator
         ie. Campaign 1 has updated to two weeks. Campaign 2 still at 1 week*/
        if (this.shouldAggregate(this.props.chartData)) {
            this.props.aggregateData(this.props.chartData, this.props.stats);
        }

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.chartData !== this.props.chartData) {
            /*Check if all the Campaigns have updated to the same Time Interval before calling Aggregator
             ie. Campaign 1 has updated to two weeks. Campaign 2 still at 1 week*/
            if (this.shouldAggregate(nextProps.chartData)) {
                this.props.aggregateData(nextProps.chartData, nextProps.stats);
            }
        }
    }

    /*

     componentWillMount() {
     this.watchers = {};
     this.dbWatcher = {};

     /!*        this.dbWatcher = agent.FirebaseWatcher.chartDataWatcher('-KmMclctWZDKexyM_9Xo');
     this.dbWatcher.orderByKey().startAt(
     this.props.startDate.clone().set({hour:0,minute:0,second:0,millisecond:0}).unix().toString()
     ).endAt(this.props.endDate.clone().set({hour:23,minute:59,second:59,millisecond:999}).unix().toString()).on('value', ()=> {console.log('You have entered the hack');

     this.props.fetchChartData('-KmMclctWZDKexyM_9Xo', this.props.startDate.set({hour:0,minute:0,second:0,millisecond:0}), this.props.endDate.clone().set({hour:23,minute:59,second:59,millisecond:999}));

     });*!/

     };

     componentWillReceiveProps(nextProps) {
     if (nextProps.consoleData.campaigns != this.props.consoleData.campaigns) {

     //Set the watchers - Watches for updates to the number of campaigns that we add
     Object.keys(nextProps.consoleData.campaigns).forEach((key) => {
     this.watchers.key = agent.FirebaseWatcher.campaignWatcher(key);
     this.watchers.key.orderByKey().startAt(
     this.props.startDate.clone().set({hour: 0, minute: 0, second: 0, millisecond: 0}).unix().toString()
     ).endAt(this.props.endDate.clone().set({
     hour: 23,
     minute: 59,
     second: 59,
     millisecond: 999
     }).unix().toString()).on('value', ()=> {
     console.log('You have entered the hack2');
     this.props.fetchChartData(key, this.props.startDate.set({
     hour: 0,
     minute: 0,
     second: 0,
     millisecond: 0
     }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));
     });
     });


     //Set the watchers on the chartData - To call the .once() in the firebase databases
     Object.keys(nextProps.consoleData.campaigns).forEach((key) => {
     this.dbWatcher.key = agent.FirebaseWatcher.chartDataWatcher(key);
     this.dbWatcher.key.orderByKey().startAt(
     this.props.startDate.clone().set({hour: 0, minute: 0, second: 0, millisecond: 0}).unix().toString()
     ).endAt(this.props.endDate.clone().set({
     hour: 23,
     minute: 59,
     second: 59,
     millisecond: 999
     }).unix().toString()).on('value', ()=> {
     console.log('You have entered the hack');
     console.log(key);

     this.props.fetchChartData(key, this.props.startDate.set({
     hour: 0,
     minute: 0,
     second: 0,
     millisecond: 0
     }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));

     });

     });
     }
     }

     componentWillUnmount() {
     // Turn off all firebase watchers
     console.log('StatsPreview ComponentWillUnmount');
     console.log(this);
     if (this.watchers) {
     Object.keys(this.watchers).forEach((key) => {
     this.watchers.key.off();
     });
     }

     }
     */

    render() {
        return (
            <section className="overview no-padding">
                <div className="list-header nodisplay">
                    <div className="header-copy">
                        <h3 className="header-title">Your Gifty Snapshot</h3>
                        <span className="header-sub"></span>
                    </div>
                </div>
                <div className="overview-header">

                    <div className="block-combine conditional-display">
                        <div >
                            <div className="block-value">${Math.round(this.props.aggregateStats.gross)}</div>
                            <div className="block-label">Gross Sent</div>
                        </div>
                        <div style={{color: '#fff', fontSize: '20px'}}>
                            &emsp;|&emsp;
                        </div>
                        <div>
                            <div className="block-value">{this.props.aggregateStats.redeemed}</div>
                            <div className="block-label">Gifts Redeemed</div>
                        </div>

                    </div>
                    <div className="overview-block conditional-nodisplay-desktop">
                            <div className="block-value">${Math.round(this.props.aggregateStats.gross)}</div>
                            <div className="block-label">Gross Sent</div>
                    </div>
                    <div className="overview-block conditional-nodisplay-desktop">
                            <div className="block-value">{this.props.aggregateStats.redeemed}</div>
                            <div className="block-label">Redeemed</div>
                    </div>
                    <div className="overview-block">
                        <div className="block-value">{this.props.aggregateStats.new}</div>
                        <div className="block-label">New Customers</div>
                    </div>
                    <div className="overview-block">
                        <div className="block-value">{this.props.aggregateStats.total}</div>
                        <div className="block-label">Gifts Sent</div>
                    </div>
                    {this.props.dateFilter === -1 ? null :
                        <PercentageChange value={this.props.aggregateStats.percentChange.value}
                                          description={this.props.aggregateStats.percentChange.description}></PercentageChange>}
                </div>

                <div className="overview-content top-shadow">
                    <div className="content-section">
                        <div className="content-section-header">
                            <div className="header-content">
                                <h3><span>Overview</span></h3>
                                <div className="header-note">Note: These statistics are
                                    aggregates over all of your Giftys sent by others.
                                </div>
                            </div>
                            <div className="header-action nodisplay">
                                <div className="button button-small">Filter: Public
                                </div>
                            </div>
                        </div>

                        <div className="analytics-tabs nodisplay">
                            <div className="tab">
                                <div className="tab-title">Gross Volume</div>
                                <div className="tab-subtitle">$9,098.50</div>
                            </div>

                            <div className="tab">
                                <div className="tab-title">New Customers</div>
                                <div className="tab-subtitle">378</div>
                            </div>

                            <div className="tab">
                                <div className="tab-title">Successful Payments</div>
                                <div className="tab-subtitle">1,187</div>
                            </div>
                        </div>

                        <div className="analytics-chart">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart margin={{ top: 20, right: 50, left: 0, bottom: 0 }}
                                           data={this.props.aggregateChartData}>
                                    <Line type='monotone' dataKey='Sent' stroke='#8884d8' strokeWidth={2}/>
                                    <XAxis dataKey="name" tick={<CustomizedAxisTick/>}/>
                                    <YAxis domain={[1, 'dataMax']} interval={1}/>
                                    <Tooltip />
                                </LineChart>
                            </ResponsiveContainer>
                            <div className="line-chart-container">

                            </div>


                        </div>
                    </div>

                    <div className="content-section nodisplay">
                        <div className="content-section-header">
                            <div className="header-content">
                                <h3><span>Channels</span></h3>
                                <div className="header-note">See how people send your
                                    Giftys. Offer businesses special pricing and track
                                    their usage.
                                </div>
                            </div>
                            <div className="header-action">
                                <div className="button button-small button-blue">+ New
                                    Segment
                                </div>
                            </div>
                        </div>

                        <div className="list-content">
                            <div className="list-rows">
                                <div className="list-row list-row-header">
                                    <div className="list-cell">
                                        <span>Source</span>
                                    </div>
                                    <div className="list-cell long">
                                        <span>Snapshot</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>Members</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>% Volume</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>Manage</span>
                                    </div>
                                </div>
                                <div className="list-row">
                                    <div className="list-cell">
                                        <span>Public</span>
                                    </div>
                                    <div className="list-cell long">
                                        <span>Standard pricing for any Giftys sent by individuals on the network.</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>8,990</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>72%</span>
                                    </div>
                                    <div className="list-cell">
                                        <div className="button button-small nodisplay">
                                            Manage
                                        </div>
                                    </div>
                                </div>

                                <div className="list-row">
                                    <div className="list-cell">
                                        <span>Work Nicer</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>50% off any Rosso Gifty</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>1</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>7%</span>
                                    </div>
                                    <div className="list-cell">
                                        <div className="button button-small">Manage
                                        </div>
                                    </div>
                                </div>

                                <div className="list-row">
                                    <div className="list-cell">
                                        <span>15% Evangelist</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>15% off for evangelists to share with their network.</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>18</span>
                                    </div>
                                    <div className="list-cell">
                                        <span>21%</span>
                                    </div>
                                    <div className="list-cell">
                                        <div className="button button-small">Manage
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatsPreview));
