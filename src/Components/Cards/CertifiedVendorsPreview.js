import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({});


class CertifiedVendorsPreview extends Component {

    render() {
        return (
            <section className="list no-padding">
                <div className="overview-content">
                    <div className="content-section">
                        <div className="content-section-header nodisplay">
                            <div className="header-content">
                                <h3><span>Segments</span></h3>
                                <div className="header-note">Offer businesses special
                                    pricing and track their usage.
                                </div>
                            </div>
                            <div className="header-action">
                                <div className="button button-small button-blue">+ New
                                    Segment
                                </div>
                            </div>
                        </div>

                        <div className="list-header">
                            <div className="header-copy">
                                <h3 className="header-title">By Segment</h3>
																<span className="header-sub">Offer businesses special pricing and track their usage.
																</span>
                            </div>

                            <div className="header-actions">
                                <div className="header-action">
                                    <div className="button button-small button-blue">+
                                        New Segment
                                    </div>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CertifiedVendorsPreview));