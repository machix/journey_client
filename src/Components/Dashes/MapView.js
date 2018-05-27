import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import medkit from '../Assets/first-aid-kit.svg'


import TransactionCard from '../Cards/Billing/TransactionCard.js';
import MapContainer from '../Map/MapContainer';
import Statistics from './ProfileDash/statistics';

import StripeCard from '../Cards/Billing/StripeCard';
import ContributionPill from './ContributionPill';

const mapStateToProps = state => ({
    contributionValue: state.common.contributionValue
});

const mapDispatchToProps = dispatch => ({
    setContributionValue: (value) => dispatch({type: 'SET_CONTRIBUTION_VALUE', value: value})
});


class MapView extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selected: 1,
            contributionVisible: false,
            value: 0
        }
    }

    contributionToggle(value) {
        if(this.state.contributionVisible === true) {
            this.setState({
                ...this.state,
                contributionVisible: !this.state.contributionVisible,
                value: 0
            })
        } else {
            this.setState({
                ...this.state,
                contributionVisible: !this.state.contributionVisible,
                value: value
            })
        }

    }

    render() {
        return (
            <div className={'mapview-container'}>
                <div className={'mapview-sidebar'}>

                    <div className={'title'}>
                        January 26, 2018
                    </div>

                    <Statistics displayMobile={false}/>


                </div>
                <div className={'map-container'}>
                    {this.state.contributionVisible === true ? <div className={'billing-modal slideInVertical'}>
                            <div className={'medkit-container'}>
                                <img src={medkit} style={{height: '50px'}}/>
                            </div>
                            <h2>
                                Oh, a contribution!
                            </h2>
                            Contributions are mainly an exploration of fun ways to interact with someone live.
                            <div className={'stripe-container'}>
                                <StripeCard color={'white'}></StripeCard>
                            </div>
                        </div>
                        : null}


                    <div className={'check-in'}>
                        <div>
                            Check-In
                        </div>
                    </div>
                    <div className={'mapview-contribution-container'}>


                        <ContributionPill string={' Meal: $5'} onClick={()=>this.contributionToggle(500)}/>

                        <ContributionPill string={' Meal: $10'} onClick={()=>this.contributionToggle(1000)}/>

                        <ContributionPill string={' Meal: $15'} onClick={()=>this.contributionToggle(1500)}/>


                        <ContributionPill string={' Pickaxe: $50'} onClick={()=>this.contributionToggle(5000)}/>
                    </div>
                    <MapContainer
                        coordinates={{lat: 28.003514, lng: 86.852070}}
                        overlayIcon={medkit}
                    />
                </div>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapView));
