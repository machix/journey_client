import React, {Component} from 'react';
import {Motion, spring} from 'react-motion'
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps"
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Icon from 'react-icon-base';


import Map from './Map';


const mapStateToProps = state => ({
    ...state,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
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


class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};

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
        this.mapContainer.blur();

    }

    handleHover = (active) => {
        if (this.props.mapExpanded === true) {
            return null
        } else {
            this.props.setMapIsHover(!this.props.mapIsHover)

        }
    };

    render() {
        return (

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
                         onMouseOver={() => this.handleHover(true)}
                         onMouseOut={() => this.handleHover(false)}
                         onClick={() => this.toggle('map')}
                         ref={c => this.mapContainer = c}
                         onBlur={()=> {console.log('blured')}}

                         style={{
                             minHeight: '105px',
                             minWidth: '105px',

                             right: `${10 * marginControl}px`,
                             top: `${20 * marginControl}px`
                         }}
                    >
                        {this.props.mapExpanded ? <div
                            onClick={() => this.toggle('closeMap')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                left: -25,
                                backgroundColor: 'white',
                                width: '25px',
                                height: '40px',
                                borderBottomLeftRadius: '5px',
                                borderTopLeftRadius: '5px'
                            }}>
                            <Icon viewBox="0 0 40 40" size={20} style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                                <g>
                                    <path
                                        d="m23.3 20l-13.1-13.6c-0.3-0.3-0.3-0.9 0-1.2l2.4-2.4c0.3-0.3 0.9-0.4 1.2-0.1l16 16.7c0.1 0.1 0.2 0.4 0.2 0.6s-0.1 0.5-0.2 0.6l-16 16.7c-0.3 0.3-0.9 0.3-1.2 0l-2.4-2.5c-0.3-0.3-0.3-0.9 0-1.2z"/>
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
                                     height: `${10 * (hoverHeight + toggleHeight) / 100 * this.props.windowHeight*0.5}px`,
                                     width: `${(10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight}px`,                                     borderRadius: `${9.8 * hoverRadius * toggleRadius / 100 * this.props.windowHeight}px`,
                                     overflow: 'hidden',
                                     zIndex: 3,
                                     border: 'solid white 3px'
                                 }}/>}
                             mapElement={<div style={{height: `100%`}}/>}/>

                    </div>
                }
            </Motion>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapContainer));


//This was removed from map-container
/*    width: `${(10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight}px`,
                             height: `${10 * (hoverHeight + toggleHeight) / 100 * this.props.windowHeight}px`,
                             borderRadius: `${10 * hoverRadius * toggleRadius / 100 * this.props.windowHeight}`,
                            */