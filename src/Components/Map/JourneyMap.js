import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
import {Polyline} from "react-google-maps";
import Icon from 'react-icon-base';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


import member3 from '../Assets/member2.jpg';


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

        this.state = {
            sherpa:
                [{lat: 27.978041, lng: 86.868418},
                    {lat: 28.002814, lng: 86.855839},
                    {lat: 28.003514, lng: 86.852070},
                    {lat: 28.007374, lng: 86.849793}],
            jude: [{lat: 27.949109, lng: 86.815923}, {lat: 27.980924, lng: 86.838754},
                {lat: 27.985954, lng: 86.841697},
                {lat: 27.991143, lng: 86.845917},
                {lat: 28.003514, lng: 86.852070},
            ],
        };
    }


    click = () => {
        this.map.panTo(this.props.liveJourneyData[this.props.position].coordinates);
    }

    render() {
        return (
            this.props.liveJourneyData.length > 0 ?

                <GoogleMap
                    defaultZoom={12}
                    //lat: 28.003514, lng: 86.852070}
                    defaultCenter={this.props.liveJourneyData[0].coordinates}
                    center={this.props.liveJourneyData[this.props.position].coordinates}
                    ref={(map) => this.map = map}
                    onClick={(e) => {
                        console.log(e.target);
                    }}
                    options={{
                        keyboardShortcuts: false,
                    }}
                    tabIndex={-1}
                    // ref={c => this.map = c}
                    mapTypeId="terrain"
                >
                    <Polyline
                        path={this.state.sherpa}
                        setVisible={true}
                        strokeOpacity={0}
                        options={{
                            keyboardShortcuts: false,
                            strokeColor: 'blue',
                            strokeOpacity: 0,
                            icons: [{
                                icon: lineSymbol,
                                offset: '0',
                                repeat: '20px'

                            }]
                        }}/>
                    <Polyline
                        path={this.state.jude}
                        strokeOpacity={0}
                        options={{
                            strokeColor: 'white',
                            strokeOpacity: 0,
                            icons: [{
                                icon: lineSymbol,
                                offset: '0',
                                repeat: '20px'

                            }]
                        }}/>

                    />
                    <OverlayView
                        position={{lat: 27.985954, lng: 86.841697}}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        getPixelPositionOffset={getPixelPositionOffset}
                    >
                        <div style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '30px',
                            backgroundColor: 'darkorange',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        >
                            <div className={'icon'}>
                                <Icon className={'image-pin-icon'} color={'white'} viewBox="0 0 40 40" size={15}>
                                    <g>
                                        <path
                                            d="m12.6 21.9c0-3.3 1.6-4.9 4.9-4.9s4.9 1.6 4.9 4.9-1.6 4.9-4.9 4.9-4.9-1.6-4.9-4.9z m19.3-14.4c0.8 0 1.5 0.3 2.2 0.9s0.9 1.4 0.9 2.2v21.3c0 0.8-0.3 1.5-0.9 2.2s-1.4 0.9-2.2 0.9h-28.8c-0.8 0-1.5-0.3-2.2-0.9s-0.9-1.4-0.9-2.2v-21.3c0-0.8 0.3-1.5 0.9-2.2s1.4-0.9 2.2-0.9h6.9l2.5-2.5h10l2.5 2.5h6.9z m-14.4 23.1c2.4 0 4.5-0.8 6.2-2.6s2.6-3.7 2.6-6.1-0.9-4.5-2.6-6.2-3.8-2.6-6.2-2.6-4.5 0.9-6.2 2.6-2.5 3.8-2.5 6.2 0.8 4.4 2.5 6.1 3.8 2.6 6.2 2.6z"/>
                                    </g>

                                </Icon>
                            </div>
                        </div>
                    </OverlayView>
                    <OverlayView
                        position={this.props.liveJourneyData[this.props.position].coordinates}
                        //{lat: 28.003514, lng: 86.852070}
                        /*
                         * An alternative to specifying position is specifying bounds.
                         * bounds can either be an instance of google.maps.LatLngBounds
                         * or an object in the following format:
                         * bounds={{
                         *    ne: { lat: 62.400471, lng: -150.005608 },
                         *    sw: { lat: 62.281819, lng: -150.287132 }
                         * }}
                         */
                        /*
                         * 1. Specify the pane the OverlayView will be rendered to. For
                         *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.
                         *    Defaults to `OverlayView.OVERLAY_LAYER`.
                         */
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        /*
                         * 2. Tweak the OverlayView's pixel position. In this case, we're
                         *    centering the content.
                         */
                        getPixelPositionOffset={getPixelPositionOffset}
                        /*
                         * 3. Create OverlayView content using standard React components.
                         */
                    >
                        <div className={'image-container hvr-grow-large'}>
                            <div className={'marker-image'}
                                 style={{
                                     backgroundSize: 'cover',
                                     backgroundImage: `url(${member3})`
                                 }}
                            >
                            </div>
                            <div className={'marker-image-pin'}
                                 style={{
                                     position: 'relative',
                                     border: 'solid 2px blue',
                                     backgroundSize: 'cover',
                                     backgroundImage: `url(${'https://s.hswstatic.com/gif/sherpa-125217967.jpg'})`
                                 }}>
                                <div className={'icon'}>
                                    <Icon className={'image-pin-icon'} viewBox="0 0 40 40" size={20}>
                                        <g>
                                            <path
                                                d="m25.7 17.8c1.6 0.8 2.8 2.4 2.8 4.3 0 1.3-0.2 1.7-1.2 1.7h-6.3l-0.9 13.7h-0.7l-0.9-13.7h-6.3c-1 0-1.2-0.4-1.2-1.7 0-1.9 1.3-3.5 2.8-4.3 0.1 0 0.2-0.1 0.3-0.1 0.6-0.4 1-0.9 1.1-1.5l1.4-9.2v-0.4c0-0.6-0.3-0.8-0.8-1.1 0 0 0 0-0.1 0-0.6-0.3-1-0.7-1-1.4 0-1.5 0.5-1.6 1.5-1.6h7.1c1 0 1.5 0.1 1.5 1.6 0 0.7-0.4 1.1-1 1.4-0.1 0-0.1 0-0.1 0-0.5 0.3-0.8 0.5-0.8 1.1v0.4l1.4 9.2c0.1 0.6 0.5 1.1 1.1 1.5 0.1 0 0.2 0.1 0.3 0.1z"/>
                                        </g>
                                    </Icon>
                                </div>
                            </div>

                            <div className={'pin'}>

                            </div>

                        </div>

                    </OverlayView>
                </GoogleMap> : null


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withScriptjs(withGoogleMap(Map))));