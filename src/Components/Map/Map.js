import React, {Component} from 'react';

import {   withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({

});


class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: 28.003514, lng: 86.852070}}
                mapTypeId="terrain"
            >
                {this.props.isMarkerShown && <Marker position={{ lat: 28.003514, lng: 86.852070}} />}
            </GoogleMap>

        );
    }
}


export default withScriptjs(withGoogleMap(Map));