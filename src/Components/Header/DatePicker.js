import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import styles from './datepicker.css';

import agent from '../../Helpers/agent';

let SelectedStartDate = moment().subtract(7, 'days');
var SelectedEndDate = moment();

const CustomArrowIcon = () => (
    <div
        style={{
      margin: '7px 6px',
      width: '11px',
      height: '11px',
      background: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDEzIDEzIj48cGF0aCBmaWxsPSIjODdCQkZEIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05LjM2NSA2LjkybC0zLjQ2MiAzLjQ2MmEuNzEuNzEgMCAwIDAgLjAwNyAxYy4yOC4yNzkuNzI1LjI4Ljk5OS4wMDZsNC41OTUtNC41OTVhLjY5NS42OTUgMCAwIDAgLjIwMi0uNDk3LjY5NS42OTUgMCAwIDAtLjIwMi0uNDk2TDYuOTEgMS4yMDRhLjcwNC43MDQgMCAwIDAtLjk5OS4wMDcuNzEuNzEgMCAwIDAtLjAwNy45OTlsMy4yOSAzLjI5SDEuNzJhLjcxMy43MTMgMCAwIDAtLjcyLjcxYzAgLjM5Mi4zMS43MS43Mi43MWg3LjY0NnoiLz48L3N2Zz4=")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%'
    }}>
        &emsp;
    </div>
);

const mapStateToProps = state => ({
    campaigns: state.common.consoleData.campaigns,
    startDate: state.common.startDate,
    endDate: state.common.endDate,
    desktop: state.common.desktop
});

const mapDispatchToProps = dispatch => ({
    dateSelection: (startDate, endDate) => dispatch({
        type: 'DATE_FILTER',
        filter: -1,
        startDate: startDate,
        endDate: endDate
    }),
    updateChart: (agreement, startDate, endDate) => dispatch(agent.FirebaseQuery.updateChartData(agreement, -1, startDate, endDate))
});


class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null
        };
    }

    dateSelected = (dateObj) => {
        console.log('In date picker');
        for (var key in this.props.campaigns) {
            this.props.updateChart(key, dateObj.startDate.clone().set({
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            }), dateObj.endDate.clone().set({hour: 23, minute: 59, second: 59, millisecond: 999}));
        }

    };

    render() {
        const { focusedInput } = this.state;
        const {startDate, endDate} = this.props

        return (
            <div>
                <DateRangePicker
                    /*{...this.props}*/
                    startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => this.dateSelected({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    customArrowIcon={<CustomArrowIcon />}
                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                    initialVisibleMonth={() => moment().subtract(1, 'month')}
                    withPortal={this.props.desktop ? false : true}
                    withFullScreenPortal={this.props.desktop ? false : true}
                    orientation={this.props.desktop ? 'horizontal' : 'vertical'}
                    initialVisibleMonth={this.props.desktop ? ()=>this.props.startDate.clone().subtract(1,'month') : ()=>this.props.endDate}
                    hideKeyboardShortcutsPanel={true}
                />
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);