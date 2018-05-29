import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView, InfoWindow} from "react-google-maps"
import moment from 'moment';


import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


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

const Sun = (props) => {
    return (
        <div>
            <div className="sun">
                <div className="circle"></div>
                <div className="eyes">
                    <span className="left"></span>
                    <span className="right"></span>
                </div>
                <div className="sunrays">
                    <span/>
                    <span/>
                    <span/>
                </div>
            </div>
        </div>
    )
};

const Cloud = (props) => {
    return (
        <div className="x2">

            <div className="cloud"></div>
            <div className="rain">
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
                <div className="drop"></div>
            </div>

        </div>
    )
};


const Moon = (props) => {
    return (
        <div id="moon">
            <div className="eyes">
                <span className="left"></span>
                <span className="right"></span>
            </div>
            <div className="crater" id="two"></div>
            <div className="crater" id="three"></div>
            <div className="crater" id="four"></div>
            <div className="crater-round" id="one"></div>
            <div className="crater-round" id="two"></div>
            <div className="crater-round" id="three"></div>
        </div>
    )
};

class WeatherContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }


    render() {
        return (
            <div className={'list-item weather'}>
                <Moon/>
                <Cloud/>

                <div className={'list-description'}>
                    <h3>14degC Cloudy
                    </h3></div>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WeatherContainer));