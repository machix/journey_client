import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import mealSmall from '../Assets/meal-small.svg'
import mealMedium from '../Assets/meal-medium.svg'
import mealLarge from '../Assets/meal-large.svg'
import pickaxe from '../Assets/pickaxe.svg'


const mapStateToProps = state => ({
    ...state,
    liveJourneyData: state.common.liveJourneyData,
    position: state.choreographer.position,

});

const mapDispatchToProps = dispatch => ({});

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
                console.log(object.contribution);
                console.log('in here');
                return <OverlayView
                    key={index}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}
                    position={object.coordinates}>
                    <div style={{
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
                </OverlayView>;

            } else {
                return <Marker key={index} position={object.coordinates}></Marker>

            }
        })
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


    render() {
        return (

            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.props.coordinates[0].coordinates}
                center={this.props.coordinates[0].coordinates}

                // ref={c => this.map = c}
            >

                {this.markerMapper()}


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