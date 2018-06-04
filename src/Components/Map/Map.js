import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow} from "react-google-maps"


import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import mealSmall from '../Assets/meal-small.svg'
import mealMedium from '../Assets/meal-medium.svg'
import mealLarge from '../Assets/meal-large.svg'
import pickaxe from '../Assets/pickaxe.svg'
import MapMarker from './MapMarker';

const {MarkerClusterer} = require("react-google-maps/lib/components/addons/MarkerClusterer");


const mapStateToProps = state => ({
    altitudeVisible: state.mapview.altitudeVisible,
    fitBounds: state.mapview.fitBounds,
    currentIndex: state.mapview.currentIndex,


    liveJourneyData: state.common.liveJourneyData,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
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


class Map extends Component {

    constructor(props) {
        super(props);
    }


    click = () => {
        this.map.panTo(this.props.liveJourneyData[this.props.position].coordinates);
    };

    markerMapper = () => {
        return this.props.coordinates.map((object, index) => {
            if (typeof(object.contribution) != 'undefined') {
                return <MapMarker
                    contribution={object.contribution}
                    onClick={() => this.props.setCurrentIndex(index)}
                    index={index}
                    key={index} position={object.coordinates}/>;

            } else {
                return <MapMarker onClick={() => this.props.setCurrentIndex(index)}
                                  index={index}
                                  key={index} position={object.coordinates}/>


            }
        })
    };


    componentWillReceiveProps(nextProps) {
        //This is for receive the currentIndex from other things like the AltitudePreview
        // if (nextProps.currentIndex !== this.props.currentIndex) {
        //     this.panTo(nextProps.currentIndex);
        // }
        // if (nextProps.altitudeVisible === true) {
        //     this.panToWithOffset(this.props.liveJourneyData[nextProps.currentIndex].coordinates, 0, this.props.windowWidth > 800 ? 100 : 40);
        // } else if (nextProps.altitudeVisible === false) {
        //     this.panToWithOffset(this.props.liveJourneyData[nextProps.currentIndex].coordinates, 0, this.props.windowWidth > 800 ? 0 : -200);
        // }
        //
        // if (nextProps.fitBounds === true) {
        //     this.fitBounds();
        // }
    }

    panTo = (index) => {
        console.log(index);
        this.map.panTo(this.props.liveJourneyData[index].coordinates);
        // this.props.setCurrentIndex(index);

    };


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
        }
    };

    // panToWithOffset = (latlng, offsetX, offsetY) => {
    //     var map = this.map;
    //
    //     this.overlayView.onAdd(() => {
    //             console.log('added');
    //         }
    //     );
    //
    //     var proj = this.overlayView.getProjection();
    //     var curPosition = new window.google.maps.LatLng(latlng.lat, latlng.lng);
    //
    //
    //     var aPoint = proj.fromLatLngToContainerPixel(curPosition);
    //     aPoint.x = aPoint.x + offsetX;
    //     aPoint.y = aPoint.y + offsetY;
    //     this.map.panTo(proj.fromContainerPixelToLatLng(aPoint));
    //     // this.overlayView.setMap(this.map);
    // };

    fitBounds = () => {
        var bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < this.props.liveJourneyData.length; i++) {
            bounds.extend(this.props.liveJourneyData[i].coordinates);
        }
        this.map.fitBounds(bounds);
    };


    render() {
        return (

            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.props.coordinates[0].coordinates}
                center={this.props.coordinates[0].coordinates}
                ref={c => this.map = c}
                mapTypeId="terrain"
            >
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={10}
                    minimumClusterSize={3}

                >
                    {this.markerMapper()}
                </MarkerClusterer>

                <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                    ref={c => this.overlayView = c}
                    position={this.props.coordinates[this.props.currentIndex].coordinates}>
                    <div></div>
                </OverlayView>


                {this.props.overlayIcon != null ? <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                    position={this.props.coordinates[0].coordinates}>

                    <div style={{
                        height: '50px',
                        width: '50px',
                        backgroundColor: 'white',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                    }}>
                        <div style={{
                            position: 'absolute',
                            bottom: '100%',
                            textShadow: '0 1px 3px rgba(0, 0, 0, .4), 0 0 30px rgba(0, 0, 0, .075)',
                            fontSize: '1.1rem',
                            fontWeight: '700',
                            color: 'white',
                        }}>
                            HALP!
                        </div>

                        <img src={this.props.overlayIcon} style={{height: '30px'}}/>

                    </div>
                </OverlayView> : null}


            </GoogleMap>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map))));


/*<OverlayView
                    key={index}

                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                    position={object.coordinates}>

                    <InfoWindow
                        onCloseClick={() => this.setState({isOpen: !this.state.isOpen})}>
                        <div>
                        dicks

                        </div>
                    </InfoWindow>
                    <div
                        onClick={() => this.props.setCurrentIndex(index)}

                        style={{
                            height: '25px',
                            width: '25px',
                            backgroundColor: 'white',
                            borderRadius: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                        }}>
                        <img src={this.imgSrc(object.contribution)} style={{height: '15px'}}/>
                    </div>
                </OverlayView>*/