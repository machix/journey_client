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
import pickaxeMarker from '../Assets/pickaxeMarker.svg';
import hi from '../Assets/hi.svg';

import MediaDisplay from '../Cards/MediaDisplay';
import WeatherContainer from './WeatherContainer';


const mapStateToProps = (state, ownProps) => ({
    currentIndex: state.mapview.currentIndex,
    liveJourneyData: state.common.liveJourneyData,
    windowWidth: state.common.windowWidth,


    index: ownProps.index,
    position: ownProps.position,
    contribution: ownProps.contribution
});

const mapDispatchToProps = dispatch => ({
    setCurrentIndex: (index) => dispatch({
        type: 'SET_CURRENT_INDEX',
        value: index
    }),
    setVideoModalVisible: (value) => dispatch({
        type: 'SET_VIDEO_MODAL_VISIBLE',
        value: value
    }),

});


class VideoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.videoModalRef.focus();
        console.log('so focused');
    }

    handleBlur() {
        this.props.setVideoModalVisible(false);
    }

    render() {
        return (
            <div className={'video-modal slideInDown'}
                 tabIndex="0"
                 ref={(video) => {
                     this.videoModalRef = video;
                 }}
                 onBlur={()=>this.handleBlur()}
            >
                <Icon viewBox="0 0 40 40"
                      onClick={() => this.props.setVideoModalVisible(false)}
                      style={{
                          color: 'white',
                          position: 'absolute',
                          right: '5px',
                          top: '5px',
                          cursor: 'pointer',
                          zIndex: 100
                      }} size={12}>
                    <g>
                        <path
                            d="m31.8 10.7l-9.3 9.3 9.3 9.3-2.4 2.3-9.3-9.3-9.3 9.3-2.3-2.3 9.3-9.3-9.3-9.3 2.3-2.3 9.3 9.3 9.3-9.3z"/>
                    </g>
                </Icon>
                <MediaDisplay/>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoModal));
