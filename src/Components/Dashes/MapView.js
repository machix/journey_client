import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';


import medkit from '../Assets/first-aid-kit.svg'
import mealSmall from '../Assets/meal-small.svg'
import mealMedium from '../Assets/meal-medium.svg'
import mealLarge from '../Assets/meal-large.svg'
import pickaxe from '../Assets/pickaxe.svg'

import MapContainer from '../Map/MapContainer';
import Statistics from './ProfileDash/statistics';
import StripeCard from '../Cards/Billing/StripeCard';
import ContributionPill from './ContributionPill';
import agent from '../../Helpers/agent';
import AltitudePreview from '../Cards/AltitudePreview';

const mapStateToProps = state => ({
    altitudeVisible: state.mapview.altitudeVisible,
    
    contributionName: state.common.contributionName,
    contributionValue: state.common.contributionValue,

    liveJourneyData: state.common.liveJourneyData,

});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    setContribution: (name, value) => dispatch({type: 'SET_CONTRIBUTION', name: name, value: value}),
    setAltitudeVisible: (value) => dispatch({type: 'SET_ALTITUDE_VISIBLE', value: value})

});


class MapView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            altitudeVisible: true,
            selected: 1,
            contributionVisible: false,
            value: 0
        }
    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.liveJourneyData);
    }

    contributionToggle(name, value) {
        if (this.state.contributionVisible === true && value === this.props.contributionValue || name === null) {
            this.setState({
                ...this.state,
                contributionVisible: !this.state.contributionVisible,
                value: 0
            });
            this.props.setContribution(null, 0);
        } else {
            this.setState({
                ...this.state,
                contributionVisible: true,
                value: value
            });
            this.props.setContribution(name, value);
        }
    }

    imgSrc = () => {
        switch (this.props.contributionValue) {
            case 500:
                return mealSmall;
            case 1000:
                return mealMedium;
            case 1500:
                return mealLarge;
            case 5000:
                return pickaxe;
        }
    };

    altitudeToggle = () => {
        console.log('altitudetotggle');
        this.props.setAltitudeVisible(!this.props.altitudeVisible);
      
    };

    render() {
        return (
            <div className={'mapview-container'}>
                <div className={'mapview-sidebar'}>

                    <div className={'title'}>
                        January 26, 2018
                    </div>

                    <Statistics displayMobile={false} altitudeOnClick={() => this.altitudeToggle()}/>
                </div>
                <div className={'map-container'}>
                    {this.state.contributionVisible === true ? <div className={'billing-modal slideInVertical'}>

                            <Icon viewBox="0 0 40 40" style={{
                                color: 'white',
                                position: 'absolute',
                                right: '20px',
                                top: '20px',
                                cursor: 'pointer'
                            }} size={25} onClick={() => this.contributionToggle(null, 25)}>
                                <g>
                                    <path
                                        d="m31.8 10.7l-9.3 9.3 9.3 9.3-2.4 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"/>
                                </g>
                            </Icon>
                            <div className={'medkit-container'}>
                                <img src={this.imgSrc()} style={{height: '50px'}}/>
                            </div>
                            <h2>
                                Oh, a {this.props.contributionName} for ${this.props.contributionValue / 100}!
                            </h2>
                            Contributions are a fun way to interact with someone on their Journey. Events are triggered when they are created and used.<br/>


                            <div className={'stripe-container'}>
                                <StripeCard color={'white'}></StripeCard>
                            </div>

                        </div>
                        : null}


                    {this.props.altitudeVisible === true ? <div className={'altitude-container slideInVerticalMedium'}>
                        <div className={'altitude-title'}>
                            <h1>Elevation Change</h1>
                        </div>
                        <Icon viewBox="0 0 40 40" style={{
                            color: 'black',
                            position: 'absolute',
                            right: '20px',
                            top: '20px',
                            cursor: 'pointer',
                            zIndex: 50
                        }} size={25} onClick={() => this.altitudeToggle()}>
                            <g>
                                <path
                                    d="m31.8 10.7l-9.3 9.3 9.3 9.3-2.4 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"/>
                            </g>
                        </Icon> <AltitudePreview/></div> : null}


                    <div className={'check-in'}>
                        <div>
                            Check-In
                        </div>
                    </div>

                    <div className={'mapview-contribution-container'}>
                        <ContributionPill string={' Meal: $5'} onClick={() => this.contributionToggle('Meal', 500)}/>
                        <ContributionPill string={' Meal: $10'} onClick={() => this.contributionToggle('Meal', 1000)}/>
                        <ContributionPill string={' Meal: $15'} onClick={() => this.contributionToggle('Meal', 1500)}/>
                        <ContributionPill string={' Pickaxe: $50'}
                                          onClick={() => this.contributionToggle('Pickaxe', 5000)}/>
                    </div>
                    <MapContainer
                        coordinates={this.props.liveJourneyData}
                        overlayIcon={null}
                    />
                </div>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapView));
//                            <span style={{fontSize: '0.8rem', marginTop: '10px', fontWeight: 'normal'}}>Events are triggered as contributions are used.</span>
