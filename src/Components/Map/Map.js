import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import member3 from '../Assets/member2.jpg';


const mapStateToProps = state => ({
    ...state,
    liveJourneyMeta: state.common.liveJourneyMeta,
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
        this.map.panTo(this.props.liveJourneyMeta[this.props.position].coordinates);
    }

    render() {
        return (

            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 28.003514, lng: 86.852070}}
                center={{lat: 28.003514, lng: 86.852070}}
                // ref={c => this.map = c}
            >

            </GoogleMap>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map))));