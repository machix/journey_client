import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import member3 from '../Assets/member2.jpg';
import medkit from '../Assets/first-aid-kit.svg'


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
    }

    render() {
        return (

            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.props.coordinates}
                center={this.props.coordinates}

                // ref={c => this.map = c}
            >
                {this.props.overlayIcon != null ? <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    getPixelPositionOffset={getPixelPositionOffset}

                    position={this.props.coordinates}>
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
                            DEPLOY ME!
                        </div>

                        <img src={this.props.overlayIcon} style={{height: '30px'}}/>

                    </div>
                </OverlayView> : null}


            </GoogleMap>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map))));