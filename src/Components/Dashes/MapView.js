import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';
import moment from 'moment';

import medkit from '../Assets/first-aid-kit.svg'
import mealSmall from '../Assets/meal-small.svg'
import mealMedium from '../Assets/meal-medium.svg'
import mealLarge from '../Assets/meal-large.svg'
import pickaxe from '../Assets/pickaxe.svg'
import radio from '../Assets/antenna.svg';

import MapContainer from '../Map/MapContainer';
import Statistics from './ProfileDash/statistics';
import StripeCard from '../Cards/Billing/StripeCard';
import ContributionPill from './ContributionPill';
import agent from '../../Helpers/agent';
import AltitudePreview from '../Cards/AltitudePreview';
import MediaDisplay from '../Cards/MediaDisplay';
import WeatherContainer from '../Map/WeatherContainer';


const mapStateToProps = state => ({
    altitudeVisible: state.mapview.altitudeVisible,

    contributionName: state.common.contributionName,
    contributionValue: state.common.contributionValue,
    windowWidth: state.common.windowWidth,

    liveJourneyData: state.common.liveJourneyData,
    currentIndex: state.mapview.currentIndex,

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

    imgSrc = (value) => {
        switch (value) {
            case 500:
                return mealSmall;
            case 1000:
                return mealMedium;
            case 1500:
                return mealLarge;
            case 5000:
                return pickaxe;
            case 50000:
                return radio;
        }
    };

    altitudeToggle = () => {
        console.log('altitudetotggle');
        this.props.setAltitudeVisible(!this.props.altitudeVisible);

    };

    contributionName = (contribution) => {
        switch (contribution) {
            case 500:
                return 'small meal ';
            case 1000:
                return 'medium meal ';
            case 1500:
                return 'large meal ';
            case 5000:
                return 'pickaxe ';
        }
    };

    contributionDescription = (contribution)=> {
        switch (contribution) {
            case 5000:
                return 'The Pickaxe allows you to send a direct message. Also pickaxes are great.';
            case 50000:
                return 'You found a radio! Include instructions and be careful with your wish. Funds will be returned if instructions are not possible. ';
            default:
                return 'Contributions are a fun way to interact with someone on their Journey. Events are triggered when they are created and used'
        }
    };

    render() {
        return (
            <div className={'mapview-container no-select'}>
                {this.props.windowWidth < 800 ? null : <div className={'mapview-sidebar'}>

                    <MediaDisplay/>
                    <Statistics className={''} displayMobile={null} altitudeOnClick={() => this.altitudeToggle()}/>
                </div>}

                <div className={'map-container'}>
                    {this.state.contributionVisible === true ? <div className={'billing-modal slideIndown'}>

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
                                <img src={this.imgSrc(this.props.contributionValue)} style={{height: '50px'}}/>
                            </div>

                            {this.props.contributionValue === 50000 ? <h2>
                                A Radio for ${this.props.contributionValue / 100}!
                            </h2> : <h2>
                                Oh, a {this.props.contributionName} for ${this.props.contributionValue / 100}!
                            </h2>}

                            {this.contributionDescription(this.props.contributionValue)}

                            <br/>


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
                        <ContributionPill string={' Meal: $15'} onClick={() => this.contributionToggle('Meal', 1500)}/>
                        <ContributionPill string={' Pickaxe: $50'}
                                          onClick={() => this.contributionToggle('Pickaxe', 5000)}/>
                        <ContributionPill string={' Radio: $500'}
                                          onClick={() => this.contributionToggle('Pickaxe', 50000)}/>
                    </div>
                    {this.props.liveJourneyData !== null && typeof(this.props.liveJourneyData) !== 'undefined' && this.props.liveJourneyData.length > 0 ?
                        <div className={'info-modal slideInDown'}>
                            <div className={'info-window'}>

                                <div className={'header-title'}>
                                    <WeatherContainer/>
                                    <div className={'text-info'}>
                                        <div
                                            className={'title'}>{moment(-this.props.liveJourneyData[this.props.currentIndex].timestamp).format('YYYY MMM DD hh:mm a')} </div>

                                        <a target="_blank"
                                           href={`https://www.google.com/maps/?q=${this.props.liveJourneyData[this.props.currentIndex].coordinates.lat},${this.props.liveJourneyData[this.props.currentIndex].coordinates.lng}`}>Location:{' '}
                                            {this.props.liveJourneyData[this.props.currentIndex].coordinates.lat}, {this.props.liveJourneyData[this.props.currentIndex].coordinates.lng}<br/>
                                        </a>
                                        Altitude: {this.props.liveJourneyData[this.props.currentIndex].altitude}
                                        meters <br/>
                                    </div>
                                </div>

                                {typeof(this.props.liveJourneyData[this.props.currentIndex].description) != 'undefined' ?
                                    <div className={'list-item description slideInDown'}>
                                        {this.props.liveJourneyData[this.props.currentIndex].description}

                                    </div> : null}

                                {typeof(this.props.liveJourneyData[this.props.currentIndex].contribution) != 'undefined' ?
                                    <div className={'list-item contribution slideInDownMedium'}>
                                        <div className={'raised xyzr'}>

                                            <div className={'contribution-circle'}>
                                                <img
                                                    src={this.imgSrc(this.props.liveJourneyData[this.props.currentIndex].contribution)}/>
                                            </div>
                                            <div className={'list-description'}>
                                                <h3>
                                                    A {this.contributionName(this.props.liveJourneyData[this.props.currentIndex].contribution)}
                                                    came!</h3>
                                                Delivered by Anonymous
                                            </div>
                                        </div>

                                    </div> : null}


                                <span style={{
                                    position: 'absolute',
                                    fontSize: '0.7rem',
                                    bottom: 0,
                                    right: 0
                                }}>Entry: {this.props.liveJourneyData[this.props.currentIndex].markerIndex}</span>
                            </div>
                            <div className={'interact-container'}>
                                <div className={'raised'}>
                                    <div className={'interact'}>
                                        <Icon viewBox="0 0 40 40" size={15}>
                                            <g>
                                                <path
                                                    d="m20 8.6q-4.6 0-8.5 1.5t-6.3 4.2-2.3 5.7q0 2.5 1.6 4.8t4.4 3.9l2 1.1-0.6 2.1q-0.5 2.1-1.6 3.9 3.4-1.4 6.2-3.8l0.9-0.9 1.3 0.2q1.5 0.1 2.9 0.1 4.6 0 8.5-1.5t6.3-4.2 2.3-5.7-2.3-5.7-6.3-4.2-8.5-1.5z m20 11.4q0 3.9-2.7 7.2t-7.3 5.2-10 1.9q-1.6 0-3.2-0.2-4.5 3.9-10.3 5.4-1.1 0.3-2.6 0.5h-0.1q-0.3 0-0.6-0.2t-0.3-0.6v-0.1q-0.1-0.1 0-0.2t0-0.3 0.1-0.2l0.1-0.2 0.2-0.2 0.2-0.2q0.1-0.1 0.7-0.7t0.7-0.9 0.7-0.9 0.8-1.1 0.6-1.3 0.5-1.7q-3.5-2-5.5-4.9t-2-6.3q0-3.9 2.7-7.2t7.3-5.2 10-1.9 10 1.9 7.3 5.2 2.7 7.2z"/>
                                            </g>
                                        </Icon>
                                    </div>
                                </div>
                                <div className={'raised'}>

                                    <div className={'interact'}>

                                        <Icon viewBox="0 0 40 40" size={15}>
                                            <g>
                                                <path
                                                    d="m8.7 30q0-0.6-0.4-1t-1-0.4-1 0.4-0.4 1 0.4 1 1 0.4 1-0.4 0.4-1z m25.7-12.9q0-1.1-0.8-2t-2-0.8h-7.9q0-1.3 1.1-3.6t1.1-3.6q0-2.1-0.8-3.2t-2.8-1q-0.6 0.5-0.9 1.9t-0.6 2.8-1.4 2.4q-0.5 0.5-1.7 2-0.1 0.1-0.5 0.7t-0.7 0.9-0.8 1-0.9 0.9-0.8 0.8-0.9 0.6-0.8 0.2h-0.7v14.3h0.7q0.3 0 0.7 0.1t0.7 0.1 0.9 0.3 0.8 0.2 0.7 0.3 0.7 0.3q4.7 1.6 7.6 1.6h2.7q4.3 0 4.3-3.7 0-0.6-0.1-1.3 0.7-0.3 1.1-1.2t0.4-1.6-0.4-1.5q1.1-1.2 1.1-2.7 0-0.6-0.2-1.2t-0.5-1.1q0.7 0 1.1-1t0.5-1.9z m2.9 0q0 2-1.1 3.7 0.2 0.7 0.2 1.5 0 1.7-0.9 3.2 0.1 0.5 0.1 1 0 2.2-1.3 3.9 0 3.2-1.9 4.9t-5.1 1.8h-2.9q-2.1 0-4.2-0.5t-4.8-1.4q-2.6-0.9-3.1-0.9h-6.4q-1.2 0-2.1-0.8t-0.8-2.1v-14.3q0-1.1 0.8-2t2.1-0.8h6.1q0.8-0.6 3-3.5 1.3-1.6 2.4-2.8 0.6-0.6 0.8-1.9t0.7-2.9 1.4-2.4q0.8-0.8 2-0.8 1.9 0 3.4 0.7t2.2 2.3 0.8 4.1q0 2.1-1.1 4.3h4q2.3 0 4 1.7t1.7 4z"/>
                                            </g>
                                        </Icon>
                                    </div>
                                </div>
                            </div>

                        </div> : null}


                    <MapContainer
                        coordinates={this.props.liveJourneyData}
                        overlayIcon={null}
                    />


                </div>
                <div className={'mapview-sidebar conditional-nodisplay-desktop'}>
                    <Statistics className={''} displayMobile={null} altitudeOnClick={() => this.altitudeToggle()}/>
                </div>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapView));
//                            <span style={{fontSize: '0.8rem', marginTop: '10px', fontWeight: 'normal'}}>Events are triggered as contributions are used.</span>
//
