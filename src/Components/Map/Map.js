import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, OverlayView} from "react-google-maps"
import {Polyline} from "react-google-maps";


import member3 from '../Assets/member2.jpg';


const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({});

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
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

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 28.003514, lng: 86.852070}}
                mapTypeId="terrain"
            >
                <Polyline
                    path={this.state.sherpa}
                    setVisible={true}
                    strokeOpacity={0}
                    options={{
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
                    position={{lat: 28.003514, lng: 86.852070}}
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
                    <div className={'image-container'}>
                        <div className={'marker-image'}
                             style={{
                                 backgroundSize: 'cover',
                                 backgroundImage: `url(${member3})`
                             }}
                        >
                        </div>
                        <div className={'marker-image'}
                             style={{
                                 border: 'solid 2px blue',
                                 backgroundSize: 'cover',
                                 backgroundImage: `url(${'https://s.hswstatic.com/gif/sherpa-125217967.jpg'})`
                             }}></div>

                        <div className={'pin'}>

                        </div>

                    </div>

                </OverlayView>
            </GoogleMap>

        );
    }
}


export default withScriptjs(withGoogleMap(Map));