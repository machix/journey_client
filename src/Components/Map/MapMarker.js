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


            </Marker>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapMarker));

//                                    ({moment(-this.props.liveJourneyData[this.props.index].timestamp).fromNow('d')} ago)
