import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'

import Sidebar from '../Sidebar/Sidebar';
import Map from '../Map/Map';
import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    visibleMeta: state.choreographer.visibleMeta,
    position: state.choreographer.position
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid))
});


class HomeDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: true,
            // Auth vars
            auth: {},
            visible: false,
            isHover: false,
        }
    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentWillReceiveProps(nextProps) {

    }

    photosMap = () => {
        console.log('photosMap');
        return Object.keys(this.props.liveJourneyMeta).sort((a, b) => this.props.liveJourneyMeta[a].timeStamp - this.props.liveJourneyMeta[b].timeStamp).map((key, index) => {
            console.log(key, index);
            return
        });
    };

    toggle = () => {
        this.setState({
            ...this.state,
            visible: !this.state.visible
        })
    };

    handleHover = (active) => {
        console.log(active);
        this.setState({
            ...this.state,
            isHover: active
        });
    };


    render() {
        return (
            <div className={"container"}>
                <Motion style={{x: spring(this.state.visible ? 30 : 0)}}>
                    {({x}) =>

                        <div className="sidebar-container" style={{
                            WebkitTransform: `translate3d(${x}vw, 0, 0)`,
                            transform: `translate3d(${x}vw, 0, 0)`,
                        }}>
                            <Sidebar></Sidebar>
                        </div>
                    }
                </Motion>

                <div className={'chat'}>
                    <div className={'chat-input'}>
                        <input type="text"
                               placeholder='Meet Superman!'
                               autComplete="off"
                               onChange={() => null}/>
                    </div>
                </div>


                <div className={"journey-container"}>
                    {this.props.liveJourneyMeta !== null ?

                        <img
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',

                                filter: this.state.visible ? 'blur(2px)' : 'none'
                            }}
                            src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/>
                        : null}

                    <Motion style={{x: spring(this.state.isHover ? 3 : 1), y: spring(this.state.isHover ? 0.5: 1)}}>
                        {({x, y}) =>
                            <div className={'map-container'}
                                 onMouseOver={() => this.handleHover(true)}
                                 onMouseOut={() => this.handleHover(false)}
                                 onClick={() => this.toggle()}
                                 style={{
                                     width: `${105 * x}px`,
                                     height: `${105 * x}px`,
                                     borderRadius: `${106*y}px`,
                                     right: '20px'
                                 }}


                            >

                                <Map isMarkerShown={true}
                                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIpabTnIbXsdIgI2Zo2zO6g3GGxUbYqw8&v=3.exp&libraries=geometry,drawing,places"
                                     loadingElement={<div style={{height: `100px`,}}/>}
                                     containerElement={<div style={{
                                         height: `${100 * x}px`,
                                         width: `${100 * x}px`,
                                         borderRadius: `${100 * y}px`,
                                         overflow: 'hidden',
                                         zIndex: 3
                                     }}/>}
                                     mapElement={<div style={{height: `100%`}}/>}/>

                            </div>
                        }
                    </Motion>
                </div>

                <div className={'blur-background blur'}>
                    {this.props.liveJourneyMeta !== null ?
                        <img
                            style={{maxWidth: '100%'}}
                            src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/> : null}
                </div>
                <div className={'blur-background-overlay'}>

                </div>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDash));

/*

*/


//<StatsPreview></StatsPreview>
//<GiftyPreviewSlide></GiftyPreviewSlide>
//<ShortSummary></ShortSummary>

//https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_' + this.props.liveJourneyMeta[3].uid + '.jpg?alt=media&token=6b901b9e-7265-4319-b0ba-2b8ca8a48878