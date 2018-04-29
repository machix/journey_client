import React, {Component} from 'react';
import {Motion, spring} from 'react-motion'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

import Icon from 'react-icon-base';


import Map from './JourneyMap';


const mapStateToProps = state => ({
    ...state,
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
    setMapExpanded: (value) => dispatch({
        type: 'SET_MAP_EXPANDED',
        value: value
    }),
    setMapIsHover: (value) => dispatch({
        type: 'SET_MAP_IS_HOVER',
        value: value
    })

});


class MapContainerSmall extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    getTime = () => {
        let timestamp = moment(-this.props.liveJourneyData[this.props.position].timestamp);
        if (moment().diff(timestamp, 'days') >= 1) {
            return timestamp.format('MMMM Do YYYY, h:mm:ss a')
        } else {
            let string = timestamp.fromNow();
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    toggle = (value) => {
        this.mapContainer.blur();

        console.log('toggle: ' + value);
        switch (value) {

            case 'map': {
                console.log('this.props.mapExpanded: ' + this.props.mapExpanded);
                if (this.props.mapExpanded) {
                    return;
                } else {
                    this.props.setMapExpanded(!this.props.mapExpanded);
                    return;
                }
            }
            case 'closeMap': {
                this.props.setMapExpanded(!this.props.mapExpanded);
                this.props.setMapIsHover(!this.props.mapIsHover)

                return;
            }
        }
    };

    componentWillReceiveProps(nextProps) {

        if(this.props.windowWidth < 800) {
            this.mapContainer.blur();
        }
    }

    toggleHeight() {
        if (this.props.mapExpanded && !this.props.chatExpanded) {
            return 7
        }
    }

    render() {
        return (
            this.props.windowWidth < 800 ?
                <Motion
                    style={{
                        marginControl: spring(this.props.mapExpanded ? 0 : 1),
                        toggleHeight: spring(this.props.mapExpanded ? 7 : 0),
                        toggleRadius: spring(this.props.mapExpanded ? 0 : 1),
                        hoverHeight: spring(this.props.mapIsHover ? 3 : 1),
                        hoverRadius: spring(this.props.mapIsHover ? 0.5 : 1),
                    }}>
                    {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>
                        <div className={'map-container'}
                             tabIndex={-1}
                             onClick={() => this.toggle('map')}
                             ref={c => this.mapContainer = c}
                             onBlur={() => {
                                 console.log('blured')
                             }}
                             style={{
                                 minHeight: '105px',
                                 minWidth: '105px',
                                 zIndex: 2,
                                 right: `${10 * marginControl}px`,
                                 top: `${20 * marginControl}px`
                             }}
                        >
                            <div
                                style={{right: `${108 + marginControl * 50}%`, top: `${-20 * marginControl}px`}}
                                className={`info-panel `}>
                                <div className={'image-container'}>
                                    <div className={'image-background'}>
                                        <img className={'image'}/>
                                    </div>
                                </div>
                                {this.props.alertNew === true ?
                                    <div>New Picture!</div> : null}
                                <div className={'info-container'}>
                                    {this.props.liveJourneyData.length > 0 ? this.getTime() : 'Loading'}
                                    <div>
                                        <Icon viewBox="0 0 40 40" size={20}
                                              style={{color: 'white'}}>
                                            <g>
                                                <path
                                                    d="m19.8 3.8c-2.7 0-5.3 1-7.2 2.8s-2.8 4.5-2.8 7.2c0 3.3 1.8 8.3 5.4 14.5 1.7 3 3.5 5.6 4.6 7.1 1-1.5 2.8-4.1 4.5-7.1 3.6-6.2 5.5-11.2 5.5-14.5 0-2.7-1.1-5.3-2.9-7.2s-4.5-2.8-7.1-2.8z m0-1.3c6.2 0 11.2 5 11.2 11.3 0 8.7-11.2 23.7-11.2 23.7s-11.3-15-11.3-23.7c0-6.3 5-11.3 11.3-11.3z m0 6.3c2.7 0 5 2.2 5 5s-2.3 5-5 5-5-2.3-5-5 2.2-5 5-5z m0 8.6c2 0 3.6-1.6 3.6-3.6s-1.6-3.7-3.6-3.7-3.7 1.6-3.7 3.7 1.6 3.6 3.7 3.6z"/>
                                            </g>
                                        </Icon>
                                        Everest Base Camp <br/>
                                        {this.props.liveJourneyData.length > 0 ? <div>
                                            {this.props.liveJourneyData[this.props.position].coordinates.lat}, {this.props.liveJourneyData[this.props.position].coordinates.lng}
                                        </div> : null

                                        }

                                    </div>
                                </div>

                            </div>

                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '-11px'
                            }}>
                                {this.props.mapExpanded ? <div
                                    onClick={() => this.toggle('closeMap')}
                                    className={'map-toggle'}
                                    style={{
                                        display: 'flex',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                        top: 0,
                                        zIndex: 5,
                                        backgroundColor: 'white',
                                        width: '40px',
                                        height: '25px',
                                    }}>
                                    <Icon viewBox="0 0 40 40" size={20} style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                                        <g>
                                            <g>
                                                <path
                                                    d="m17.5 16.7l-13.6 13.1c-0.3 0.3-0.9 0.3-1.2 0l-2.5-2.4c-0.3-0.3-0.3-0.9 0-1.2l16.7-16c0.1-0.1 0.4-0.2 0.6-0.2s0.5 0.1 0.6 0.2l16.7 16c0.3 0.3 0.3 0.9 0 1.2l-2.5 2.4c-0.3 0.3-0.9 0.3-1.2 0l-13.6-13.1z"/>
                                            </g>

                                        </g>
                                    </Icon>
                                </div> : null}
                                <Map isMarkerShown={true}
                                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIpabTnIbXsdIgI2Zo2zO6g3GGxUbYqw8&v=3.exp&libraries=geometry,drawing,places"
                                     loadingElement={<div style={{height: `100px`,}}/>}
                                     tabIndex={-1}

                                     containerElement={
                                         <div style={{
                                             minHeight: '100px',
                                             minWidth: '100px',
                                             height: this.props.windowWidth < 800 ? `${10 * (toggleHeight) * 10 / 7 / 100 * this.props.windowHeight}px` : `${10 * (hoverHeight + toggleHeight)/ 100 * this.props.windowHeight}px`,
                                             width: '100vw',
                                             overflow: 'hidden',
                                             zIndex: 3,
                                             position: 'relative',
                                             border: 'solid white 3px'
                                         }}>
                                         </div>}
                                     mapElement={<div style={{height: `100%`}}/>}/>
                            </div>

                        </div>
                    }
                </Motion> : null



        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapContainerSmall));
