import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import PageFade from '../../../Helpers/PageFade'

const mapStateToProps = (state, ownProps) => ({
    transactions: state.billingReducer.transactions,
    filteredGifty: ownProps.filteredGifty
});

const mapDispatchToProps = dispatch => ({});


class TransactionDisplay extends Component {

    arrayMapper = function (transactionsArray) {
        if (transactionsArray.length === 0) {
            return <div style={{textAlign: 'left'}}>No transaction information available!</div>
        } else {
            return transactionsArray.map(function (object, index) {
                return (
                    <div className="transaction-row" key={index}>
                        <div >{moment.unix(object.timestamp).format('YYYY-MM-DD')}</div>
                        <div>{object.gift}</div>
                        <div >${(object.stripe.cents / 100).toFixed(2)}</div>
                    </div>)
            }, this)
        }
    }

    filterTransactionInfo = (transactions, filtered) => {
        var filteredArray = [];
        if (filtered !== 'all') {
            Object.keys(transactions).forEach((key) => {
                if (transactions[key].gift === filtered) {
                    filteredArray.push(transactions[key]);
                }
            });
            return filteredArray.sort(function(a, b){return parseFloat(b.timestamp)-parseFloat(a.timestamp)});
        } else {
            Object.keys(transactions).forEach((key) => {
                filteredArray.push(transactions[key]);
            });
            return filteredArray.sort(function(a, b){return parseFloat(b.timestamp)-parseFloat(a.timestamp)});
        }
    }


    render() {

        return (
            <PageFade>
                <section className="list no-padding">
                    <div className="list-content">
                        <div className="list-rows">
                            <div className="list-row">
                                <div className="list-cell transaction-history">
                                    {this.props.transactions ? this.arrayMapper(this.filterTransactionInfo(this.props.transactions, this.props.filteredGifty)) : '...Loading'}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PageFade>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionDisplay));
