import React, {Component} from 'react';
import {Motion, spring} from 'react-motion'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import Icon from 'react-icon-base';


import Map from './Map';


const mapStateToProps = state => ({
    chatExpanded: state.common.chatExpanded,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
    liveJourneyData: state.common.liveJourneyData,

    position: state.choreographer.position,
    prevPosition: state.choreographer.prevPosition,
    nextPosition: state.choreographer.nextPosition,
    journeyId: state.choreographer.journeyId,
    alertNew: state.common.alertNew

});

const mapDispatchToProps = dispatch => ({


});


class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (

            <Map isMarkerShown={true}
                 googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIpabTnIbXsdIgI2Zo2zO6g3GGxUbYqw8&v=3.exp&libraries=geometry,drawing,places"
                 loadingElement={<div style={{height: `100px`,}}/>}
                 containerElement={
                     <div style={{
                         minHeight: '100px',
                         minWidth: '100px',
                         height: '100%',
                         width: '100%',
                     }}/>}
                 mapElement={<div style={{height: `100%`, width: '100%'}}/>}/>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapContainer));


//This was removed from map-container
/*    width: `${(10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight}px`,
                             height: `${10 * (hoverHeight + toggleHeight) / 100 * this.props.windowHeight}px`,
                             borderRadius: `${10 * hoverRadius * toggleRadius / 100 * this.props.windowHeight}`,
                            */