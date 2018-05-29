import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow} from "react-google-maps"
import moment from 'moment';


import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import mealSmallMarker from '../Assets/meal-small-marker.svg'
import mealMediumMarker from '../Assets/meal-medium-marker.svg'
import mealLargeMarker from '../Assets/meal-large-marker.svg'
import pickaxeMarker from '../Assets/pickaxeMarker.svg'
import MediaDisplay from '../Cards/MediaDisplay';
import WeatherContainer from './WeatherContainer';


const mapStateToProps = (state, ownProps) => ({
    currentIndex: state.mapview.currentIndex,
    liveJourneyData: state.common.liveJourneyData,


    index: ownProps.index,
    position: ownProps.position,
    contribution: ownProps.contribution
});

const mapDispatchToProps = dispatch => ({
    setCurrentIndex: (index) => dispatch({
        type: 'SET_CURRENT_INDEX',
        value: index
    }),

});

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 3),
    y: -(height / 2),
});

var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 3
};


class MapMarker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    setCurrentIndex(index) {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.props.setCurrentIndex(this.props.index);
        console.log(this.state.isOpen);
    }

    iconSrc = (value) => {
        console.log(typeof(this.props.contribution) != 'undefined')
        switch (value) {
            case 500:
                return mealSmallMarker;
            case 1000:
                return mealMediumMarker;
            case 1500:
                return mealLargeMarker;
            case 5000:
                return pickaxeMarker;
            default:
                return null;
        }
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

    render() {
        return (
            <Marker
                onClick={() => this.setCurrentIndex(this.props.index)}
                key={this.props.key}
                icon={{
                    url: this.iconSrc(this.props.contribution),
                    size: new window.google.maps.Size(28, 40),
                }}
                zIndex={typeof(this.props.contribution) != 'undefined' ? 100 : 0}
                position={this.props.position}>

                {this.state.isOpen && <InfoWindow style={{width: '100%'}}
                                                  onCloseClick={() => this.setState({isOpen: !this.state.isOpen})}>
                    <div className={'info-window'}>
                        <h3>{moment(-this.props.liveJourneyData[this.props.index].timestamp).format('YYYY MMM DD hh:mm a')} </h3>


                        <a href={`https://www.google.com/maps/?q=${this.props.liveJourneyData[this.props.index].coordinates.lat},${this.props.liveJourneyData[this.props.index].coordinates.lng}`}>Location:{' '}
                            {this.props.liveJourneyData[this.props.index].coordinates.lat}, {this.props.liveJourneyData[this.props.index].coordinates.lng}<br/>
                        </a>
                        Altitude: {this.props.liveJourneyData[this.props.index].altitude} meters <br/><br/>

                     <WeatherContainer/>

                        {typeof(this.props.contribution) != 'undefined' ? <div className={'list-item'}>
                            <div className={'contribution-circle'}>
                                <img src={this.iconSrc(this.props.contribution)}/>
                            </div>
                            <div className={'list-description'}>
                                <h3>A {this.contributionName(this.props.contribution)} came!</h3>
                                Delivered by Anonymous
                            </div>

                        </div> : null}
                        <div className={'media-container-infowindow'}>
                            <div className={'media-holder'}>
                            </div>
                            <div className={'interact-container'}>
                                <div className={'interact'}>
                                    <Icon viewBox="0 0 40 40" size={15}>
                                        <g>
                                            <path
                                                d="m20 8.6q-4.6 0-8.5 1.5t-6.3 4.2-2.3 5.7q0 2.5 1.6 4.8t4.4 3.9l2 1.1-0.6 2.1q-0.5 2.1-1.6 3.9 3.4-1.4 6.2-3.8l0.9-0.9 1.3 0.2q1.5 0.1 2.9 0.1 4.6 0 8.5-1.5t6.3-4.2 2.3-5.7-2.3-5.7-6.3-4.2-8.5-1.5z m20 11.4q0 3.9-2.7 7.2t-7.3 5.2-10 1.9q-1.6 0-3.2-0.2-4.5 3.9-10.3 5.4-1.1 0.3-2.6 0.5h-0.1q-0.3 0-0.6-0.2t-0.3-0.6v-0.1q-0.1-0.1 0-0.2t0-0.3 0.1-0.2l0.1-0.2 0.2-0.2 0.2-0.2q0.1-0.1 0.7-0.7t0.7-0.9 0.7-0.9 0.8-1.1 0.6-1.3 0.5-1.7q-3.5-2-5.5-4.9t-2-6.3q0-3.9 2.7-7.2t7.3-5.2 10-1.9 10 1.9 7.3 5.2 2.7 7.2z"/>
                                        </g>
                                    </Icon>
                                </div>
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


                        <span style={{
                            position: 'absolute',
                            fontSize: '0.7rem',
                            bottom: 0,
                            right: 0
                        }}>Entry: {this.props.liveJourneyData[this.props.index].markerIndex}</span>
                    </div>
                </InfoWindow>}
            </Marker>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapMarker));