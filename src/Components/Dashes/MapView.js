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
            selected: 1
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

                    <div className={'check-in'}>
                        <div>
                            Check-In
                        </div>
                    </div>
                    <div className={'mapview-contribution-container'}>


                        <ContributionPill string={' Meal: $5'}/>

                        <ContributionPill string={' Meal: $10'}/>

                        <ContributionPill string={' Meal: $15'}/>


                        <ContributionPill string={' Pickaxe: $50'}/>
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
