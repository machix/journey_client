import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const mapStateToProps = state => ({
    ...state.common,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({});


class ShortSummary extends Component {
    render() {
        return (
            <section className="columns no-select">
                <div className="column">
                    <div className="column-header">Balance</div>
                    <a className="column-content">
                        <div className="column-content-children">
                            <div className="overview-information-container">
                                <div className="overview-information">
                                    <div className="overview-information-value">
                                        ${this.props.consoleData.payment.balance.cad.cents / 100}
                                    </div>

                                    <div className="overview-information-subtitle">
                                        available
                                    </div>
                                </div>

                                <div className="overview-information nodisplay">
                                    <div className="overview-information-value">$29.92
                                    </div>

                                    <div className="overview-information-subtitle">
                                        Pending
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column-content-link-label-container">
                            <Link to="/billing">
                                <div className="column-content-link-label">View transaction
                                    history
                                </div>
                            </Link>
                        </div>
                    </a>
                </div>

                <div className="column">
                    <div className="column-header">Campaigns</div>
                    <a className="column-content">
                        <div className="column-content-children">
                            <div className="overview-information-container">
                                <div className="overview-information">
                                    <div
                                        className="overview-information-value">{this.props.consoleData.active_campaigns ? Object.keys(this.props.consoleData.active_campaigns).length : 0 }
                                        &nbsp;active
                                    </div>

                                    <div className="overview-information-subtitle">
                                        of {this.props.consoleData.active_campaigns ? Object.keys(this.props.consoleData.campaigns).length : 0}
                                        &nbsp;campaigns total
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column-content-link-label-container">
                            <Link to="/campaigns">
                                <div className="column-content-link-label">View campaigns
                                </div>
                            </Link>
                        </div>
                    </a>
                </div>

                <div className="column is-disabled">
                    <div className="column-header ">Notifications</div>
                    <a className="column-content">
                        <div className="column-content-children">
                            <div className="overview-information-container">
                                <div className="overview-information">
                                    <div className="overview-information-value">none to
                                        review
                                    </div>

                                    <div
                                        className="overview-information-subtitle">{this.props.consoleData.notifications ? Object.keys(this.props.consoleData.notifications).length : 0 }
                                        &nbsp;total
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column-content-link-label-container">
                            <div className="column-content-link-label">View notifications
                            </div>
                        </div>
                    </a>
                </div>
            </section>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShortSummary));