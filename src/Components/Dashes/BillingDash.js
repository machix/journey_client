import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageFade from '../../Helpers/PageFade.js'
import HOC from '../../Helpers/HOC'

import TransactionCard from '../Cards/Billing/TransactionCard.js';

import StripeCard from '../Cards/Billing/StripeCard';

const BillingInfoTab = props => {

    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('billing');
    }

    return (
        <li className="tab nav-item">
            <a href=""
               className={ props.tab === 'billing' ? 'nav-link is-selected' : 'nav-link' }
               onClick={clickHandler}>
                 Billing Information
            </a>
        </li>
    );
};


const TransactionInfoTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('transactions');
    };
    return (
        <li className="tab nav-item">
            <a
                href=""
                className={ props.tab === 'transactions' ? 'nav-link is-selected' : 'nav-link' }
                onClick={clickHandler}>
                Transaction Information
            </a>
        </li>
    );
};


const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    transactionHistory: state.common.consoleData.payment.transaction_history,
    tab: state.dashState.tab
});

const mapDispatchToProps = dispatch => ({
    onTabClick: (tab) => dispatch({type: 'CHANGE_TAB', tab})
});


class BillingDash extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <PageFade>
                <HOC>
                    <div className="main-container">
                        <div className="main">
                            <div className="content transaction-wrapper">
                                <ul className="tabs nav nav-pills outline-active">
                                    <TransactionInfoTab
                                        tab={this.props.tab}
                                        onTabClick={this.props.onTabClick}/>
                                    <BillingInfoTab
                                        tab={this.props.tab}
                                        onTabClick={this.props.onTabClick}/>
                                </ul>
                                {this.props.tab === 'billing' ? <StripeCard></StripeCard> :
                                    <TransactionCard></TransactionCard> }
                            </div>
                        </div>
                    </div>
                </HOC>
            </PageFade>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BillingDash));
