import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import agent from '../../../Helpers/agent';



const mapStateToProps = (state, ownProps) => ({
    // transaction_id: state.common.consoleData.transaction_id,
    // transactions: state.billingReducer.transactions,
    // giftys: state.common.consoleData.giftys,
    // startDate: state.common.startDate,
    // endDate: state.common.endDate,
});

const mapDispatchToProps = dispatch => ({
    updateTransactionInfo: (id, gift, startDate, endDate) => dispatch(agent.FirebaseQuery.updateTransactionInfo(id, gift, startDate, endDate)),
    filterTransactionInfo: (updatedInfo) => dispatch({type: 'FILTERED_TRANSACTIONS', transactions: updatedInfo})
});


class TransactionCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'all',
            options: null
        }
    }

/*    filterTransactionInfo = (value) => {
        console.log(value);
        var filteredObj = {};

        Object.keys(this.props.transactions).forEach((key) => {
            console.log(key);

            if (this.props.transactions[key].gift === value) {
                filteredObj[key] = this.props.transactions[key]
            }
        })
        console.log(filteredObj);
        this.props.filterTransactionInfo(filteredObj);
    }*/

    selectionsMap = (giftys) => {
        let options = [{value: 'all', label: 'All'}];
        Object.keys(giftys).forEach(function (key, index) {
            options.push({value: giftys[key].lang.gift, label: giftys[key].lang.gift})
        });
        return options;
    };

    selectHandler(val) {
        this.setState({
            selected: val.value
        });
        if (val.value === 'all') {

            this.props.updateTransactionInfo(this.props.transaction_id, 'all', this.props.startDate, this.props.endDate);
        } else {

             this.props.updateTransactionInfo(this.props.transaction_id, val.value, this.props.startDate, this.props.endDate);
        }
    }

    componentWillMount() {

        // if (this.props.giftys) {
        //     let options = this.selectionsMap(this.props.giftys);
        //     this.setState({
        //         ...this.state,
        //         options: options
        //     })
        // }
        // if (this.props.transactions && this.props.transaction_id) {
        // } else {
        //     this.props.updateTransactionInfo(this.props.transaction_id, 'all', this.props.startDate.clone(), this.props.endDate.clone());
        // }
    }

    componentWillReceiveProps(nextProps) {
        /*transaction_id is the ID associated with the specific console*/
        let newStartDate = nextProps.startDate.clone().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });;
        let newEndDate = nextProps.endDate.clone();

        if (nextProps.transaction_id !== this.props.transaction_id || this.props.startDate.unix() !== nextProps.startDate.unix() || this.props.endDate.unix() !== nextProps.endDate.unix()) {
            this.props.updateTransactionInfo(nextProps.transaction_id, 'all', newStartDate, newEndDate);
        }
        if (nextProps.giftys !== this.props.giftys) {
            let options = this.selectionsMap(nextProps.giftys);
            this.setState({
                ...this.state,
                options: options
            })
        }
    }

    render() {

        return (<div>
                <section className="list no-padding">
                    <div className="list-header no-select">
                        <div className="header-copy">
                            <h4>Transaction History by Gifty </h4>
                        </div>

                    </div>

                </section>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionCard));
