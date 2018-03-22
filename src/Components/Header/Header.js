import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from './DatePicker';
import { CSSTransitionGroup } from 'react-transition-group';
import Measure from 'react-measure';
import moment from 'moment';

import SlideWrapper from './SlideWrapper';
import Icon from 'react-icon-base';

import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    consoleData: state.common.consoleData,
    currentDate: state.common.currentDate,
    dateFilter: state.common.dateFilter,
    endDate: state.common.endDate
});

const mapDispatchToProps = dispatch => ({
    dateSelection: (selection, startDate, endDate) => dispatch({
        type: 'DATE_FILTER',
        filter: selection,
        startDate: startDate,
        endDate: endDate
    }),
    updateChart: (agreement, filter, startDate, endDate) => dispatch(agent.FirebaseQuery.updateChartData(agreement, filter, startDate, endDate)),
    menuToggle: (value) => dispatch({
        type: 'SIDEBAR_OPEN',
        value: value
    })
});


class Header extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        this.state = {
            dimensions: {
                width: -1,
                height: -1
            },
            dimensions2: {
                width: -1,
                height: -1
            }
        }
    }

    dateSelected = (selection) => {
        if (selection === 0) {

            for (var key in this.props.consoleData.campaigns) {
                this.props.updateChart(key, selection, moment.unix(this.props.consoleData.console_creation_date).set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                }), this.props.endDate);
            }

            /*
             this.props.dateSelection(selection, null, null);
             */
        } else {
            let newStartDate = this.props.currentDate.clone();
            let newEndDate = this.props.currentDate.clone();

            for (var key in this.props.consoleData.campaigns) {

                let tempStartDate = newStartDate.clone().subtract(selection, 'weeks').set({
                    hour: 0,
                    minute: 0,
                    second: 0,
                    millisecond: 0
                });

                this.props.updateChart(key, selection, tempStartDate.clone(), newEndDate.clone());

            }


            /*  this.props.dateSelection(selection, startDate, endDate)*/
        }
    }


    render() {

        return (
            <div className="header-container">
                <div className="sidebar-spacer"></div>
                <div className="header-main-container">
                    <header>
                        <nav>

                            <span>


                                <div className="date-picker">
                                    <DatePicker></DatePicker>
                                </div>

                                <div>
                                    <div style={{
                                            display: 'inline-block',
                                            paddingRight: '10px'
                                      }}
                                         className="date-filters-group conditional-nodisplay-desktop pointer">
                                        <Icon viewBox="0 0 40 40" style={{paddingBottom: '4px'}} size={25} onClick={()=>this.props.menuToggle(!this.props.sidebarOpen)}>
                                            <g><path d="m5 10h30v3.4h-30v-3.4z m0 11.6v-3.2h30v3.2h-30z m0 8.4v-3.4h30v3.4h-30z"/></g>
                                        </Icon>

                                    </div>
                                    <Measure
                                        bounds
                                        onResize={(contentRect) => {
                                    this.setState({ ...this.state, dimensions2: contentRect.bounds })
                                    }}
                                    >
                                        {({ measureRef }) =>
                                            <div ref={measureRef} className="date-filters no-select">
                                                <SlideWrapper dateFilter={this.props.dateFilter}
                                                              totalWidth={this.state.dimensions2.width}
                                                              selectorHeight={this.state.dimensions.height}
                                                              selectorWidth={this.state.dimensions.width}>
                                                    <div className="date-filters-group">
                                                        <Measure
                                                            bounds
                                                            onResize={(contentRect) => {
                                                                            this.setState({ ...this.state, dimensions: contentRect.bounds })
                                                                               }}
                                                        >
                                                            {({ measureRef }) =>
                                                                <a ref={measureRef}
                                                                   onClick={()=>this.dateSelected(1)}
                                                                   className="date-filter">1W</a>
                                                            }
                                                        </Measure>
                                                        <a onClick={()=>this.dateSelected(2)}
                                                           className="date-filter">2W</a>
                                                        <a onClick={()=>this.dateSelected(4)}
                                                           className="date-filter">1M</a>
                                                        <a onClick={()=>this.dateSelected(12)}
                                                           className="date-filter">3M</a>
                                                        <a onClick={()=>this.dateSelected(52)}
                                                           className="date-filter">1Y</a>
                                                        <a onClick={()=>this.dateSelected(0)}
                                                           className="date-filter">ALL</a>
                                                    </div>
                                                </SlideWrapper>
                                            </div>
                                        }

                                    </Measure>
                                </div>
											</span>

                            <div className="search-field">
                                <input type="search" className="search-field-input"
                                       placeholder="Search..."/>
                            </div>

                            <ul className="top-links conditional-display">
                                <li>
                                    <div className="top-link" onClick={()=>agent.Auth.logout()}>
                                        <a href="/"
                                           className="top-link-link top-link-link--feedback"></a>
                                        <div className="top-link-tooltip">
                                            <div className="top-link-tooltip-label">Send feedback</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </header>
                </div>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

/*
 <div className="date-range">
 <div className="date-range-input">
 <input className="date-input" tabIndex="1" value=""
 placeholder="MM/DD/YYYY"/>
 <span className="date-input-arrow"></span>
 <input className="date-input" tabIndex="1" value=""
 placeholder="MM/DD/YYYY"/>
 </div>
 </div>*/

/*
 <div className="date-filters-group">
 <a className="date-filter">MTD</a>
 <a className="date-filter">QTD</a>
 <a className="date-filter">YTD</a>
 </div>*/