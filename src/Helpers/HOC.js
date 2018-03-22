import React, { Component } from 'react';
import { connect } from 'react-redux';

import agent from './agent';

const mapStateToProps = state => ({
    ...state.common,
    console_id: state.common.consoleData.console_id,
});

const mapDispatchToProps = dispatch => ({
    /*    createDefaultCampaign: (dashboard, bundle) => agent.FirebaseQuery.consoleEndpoint(null, 'create_campaign', dashboard, '/links', bundle),*/
    fetchChartData: (agreement, startDate, endDate) => dispatch(agent.FirebaseQuery.updatewChartData(agreement, null, startDate, endDate))
});


class HOC extends Component {

    componentWillMount() {
        console.log('HOC');
        this.watchers = {};
        this.dbWatcher = {};


        //Set the watchers - Watches for updates to the number of campaigns that we add
        //TODO this is not currently pointing at the right area. It works because irrespective of whether it's pointing at the actual campaign or not. Should really create a new watcher on a new child campaign
        /*    Object.keys(this.props.consoleData.campaigns).forEach((key) => {
         this.watchers.key = agent.FirebaseWatcher.campaignWatcher(key);
         this.watchers.key.orderByKey().startAt(
         this.props.startDate.clone().set({hour: 0, minute: 0, second: 0, millisecond: 0}).unix( ).toString()
         ).endAt(this.props.endDate.clone().set({
         hour: 23,
         minute: 59,
         second: 59,
         millisecond: 999
         }).unix().toString()).on('value', ()=> {
         this.props.fetchChartData(key, this.props.startDate.set({
         hour: 0,
         minute: 0,
         second: 0,
         millisecond: 0
         }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));
         });
         });
         */
        /*

         //Set the watchers on the chartData - To call the .once() in the firebase databases
         Object.keys(this.props.consoleData.campaigns).forEach((key) => {
         this.dbWatcher.key = agent.FirebaseWatcher.chartDataWatcher(key);
         this.dbWatcher.key.orderByKey().startAt(
         this.props.startDate.clone().set({hour: 0, minute: 0, second: 0, millisecond: 0}).unix().toString()
         ).endAt(this.props.endDate.clone().set({
         hour: 23,
         minute: 59,
         second: 59,
         millisecond: 999
         }).unix().toString()).on('value', ()=> {
         this.props.fetchChartData(key, this.props.startDate.set({
         hour: 0,
         minute: 0,
         second: 0,
         millisecond: 0
         }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));

         });

         });
         */
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.console_id !== this.props.console_id) {
            this.dbWatcher[this.props.console_id + '_public'] = agent.FirebaseWatcher.chartDataWatcher(this.props.console_id + '_public');
            ;
            this.dbWatcher[this.props.console_id + '_public'].orderByKey().startAt(
                this.props.startDate.clone().set({hour: 0, minute: 0, second: 0, millisecond: 0}).unix().toString()
            ).endAt(this.props.endDate.clone().set({
                hour: 23,
                minute: 59,
                second: 59,
                millisecond: 999
            }).unix().toString()).on('value', ()=> {
                this.props.fetchChartData(this.props.console_id + '_public', this.props.startDate.set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));
            });

        }

        /*  /!*As a result of not automatically generating a campaign on new Registration*!/
         if(!nextProps.consoleData.campaigns) {
         this.props.createDefaultCampaign(this.props.console_id, {name: 'My First Email Campaign!', type: 'email'});
         };*/
        if (nextProps.consoleData.campaigns !== this.props.consoleData.campaigns && nextProps.consoleData.campaigns) {

            /*           //Set the watchers - Watches for updates to the number of campaigns that we add
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
             this.props.fetchChartData(key, this.props.startDate.set({
             hour: 0,
             minute: 0,
             second: 0,
             millisecond: 0
             }), this.props.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));
             });
             });
             */

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
        if (this.watchers) {
            Object.keys(this.watchers).forEach((key) => {
                this.watchers.key.off();
            });
        }

    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HOC);
