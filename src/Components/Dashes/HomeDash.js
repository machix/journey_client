import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import Transition from 'react-transition-group/Transition';
import Measure from 'react-measure'

import Sidebar from '../Sidebar/Sidebar';
import Map from '../Map/Map';
import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    visibleMeta: state.choreographer.visibleMeta,
    position: state.choreographer.position,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    setWindowDims: (width, height) => dispatch({
        type: 'SET_WINDOW_DIMS',
        windowWidth: width,
        windowHeight: height
    })
});

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

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
            sidebarVisible: false,
            mapExpanded: false,
            isHover: false,
            commandsVisible: false,
            commands: ['Share, Donate, Contribute']
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.props.setWindowDims(window.innerWidth, window.innerHeight);
    }

    photosMap = () => {
        console.log('photosMap');
        return Object.keys(this.props.liveJourneyMeta).sort((a, b) => this.props.liveJourneyMeta[a].timeStamp - this.props.liveJourneyMeta[b].timeStamp).map((key, index) => {
            console.log(key, index);
            return
        });
    };

    toggle = (value) => {

        switch (value) {
            case 'sidebar': {

                this.setState({
                    ...this.state,
                    sidebarVisible: !this.state.sidebarVisible
                });

                return;
            }
            case 'map': {
                console.log('this.state.mapExpanded: ' + this.state.mapExpanded);
                if (this.state.mapExpanded) {
                    return;
                } else {
                    this.setState({
                        ...this.state,
                        mapExpanded: !this.state.mapExpanded
                    });
                    return;
                }
            }
            case 'closeMap': {
                this.setState({
                    ...this.state,
                    mapExpanded: !this.state.mapExpanded,
                    isHover: false,
                });
                return;
            }
        }

    };

    handleHover = (active) => {
        console.log(active);
        if (this.state.mapExpanded === true) {
            return null
        } else {
            this.setState({
                ...this.state,
                isHover: active
            });
        }

    };

    handleChange = (event,) => {
        let str = event.target.value;
        if (str.startsWith('/')) {
            console.log('is a command')
            this.setState({
                ...this.state,
                commandsVisible: true
            })
        } else {
            console.log('is not a command');
            this.setState({
                ...this.state,
                commandsVisible: false
            })
        }
    };


    render() {
        return (
            <div className={"container"}>
                <Motion style={{x: spring(this.state.sidebarVisible ? 30 : 0)}}>
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

                    <Transition
                        unmountOnExit={true}
                        in={this.state.commandsVisible}
                        out={!this.state.commandsVisible}
                        timeout={200}>
                        {(state) => (
                            <span className={`chat-commands-${state} chat-commands`}>
                                Share </span>)}
                    </Transition>
                    <Transition
                        unmountOnExit={true}
                        in={this.state.commandsVisible}
                        out={!this.state.commandsVisible}
                        timeout={200}>
                        {(state) => (
                            <span className={`chat-commands-${state} chat-commands`}>
                                Contribute </span>)}
                    </Transition>
                    <Transition
                        unmountOnExit={true}
                        in={this.state.commandsVisible}
                        out={!this.state.commandsVisible}
                        timeout={200}>
                        {(state) => (
                            <span className={`chat-commands-${state} chat-commands`}>
                                Pin </span>)}
                    </Transition>

                    <div className={'chat-input'}>
                        <input type="text"
                               style={{width: '100%'}}
                               placeholder="Enter a comment or /'command'"
                               autComplete="off"
                               onChange={(e) => this.handleChange(e)}/>
                    </div>
                </div>

                <div className={'logo'} onClick={() => this.toggle('sidebar')}>
                    <img className={'logo-image'}
                         src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png"}/>
                </div>

                <div className={'menu'}>
                    <Icon viewBox="0 0 40 40" size={20} style={{color: 'white'}}>
                        <g>
                            <path
                                d="m20 18.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m-10 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m20 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
                        </g>
                    </Icon>
                </div>


                <div className={"journey-container"}>
                    {this.props.liveJourneyMeta !== null ?
                        <Motion
                            style={{
                                marginControl: spring(this.state.mapExpanded ? 0 : 1),
                                toggleHeight: spring(this.state.mapExpanded ? 7 : 0),
                                hoverHeight: spring(this.state.mapExpanded ? 3 : 0),
                            }}>
                            {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>
                                <img
                                    style={{
                                        left: 0,
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: `${this.props.windowWidth - ((10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight)}px`,
                                        filter: this.state.sidebarVisible ? 'blur(2px)' : 'none'
                                    }}
                                    src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/>}
                        </Motion>
                        : null}

                    <Motion
                        style={{
                            marginControl: spring(this.state.mapExpanded ? 0 : 1),
                            toggleHeight: spring(this.state.mapExpanded ? 7 : 0),
                            toggleRadius: spring(this.state.mapExpanded ? 0 : 1),
                            hoverHeight: spring(this.state.isHover ? 3 : 1),
                            hoverRadius: spring(this.state.isHover ? 0.5 : 1),

                        }}>
                        {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>
                            <div className={'map-container'}
                                 onMouseOver={() => this.handleHover(true)}
                                 onMouseOut={() => this.handleHover(false)}
                                 onClick={() => this.toggle('map')}
                                 style={{
                                     minHeight: '105px',
                                     minWidth: '105px',
                                     width: `${(10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight}px`,
                                     height: `${10 * (hoverHeight + toggleHeight) / 100 * this.props.windowHeight}px`,
                                     borderRadius: `${10 * hoverRadius * toggleRadius / 100 * this.props.windowHeight}`,
                                     right: `${10 * marginControl}px`,
                                     top: `${20 * marginControl}px`
                                 }}
                            >
                                {this.state.mapExpanded ? <div
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
                                     containerElement={
                                         <div style={{
                                             minHeight: '100px',
                                             minWidth: '100px',
                                             height: `${(9.85 * (hoverHeight + toggleHeight)) / 100 * this.props.windowHeight}px`,
                                             width: `${(9.8 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight}px`,
                                             borderRadius: `${9.8 * hoverRadius * toggleRadius / 100 * this.props.windowHeight}px`,
                                             overflow: 'hidden',
                                             zIndex: 3
                                         }}/>}
                                     mapElement={<div style={{height: `100%`}}/>}/>

                            </div>
                        }
                    </Motion>
                </div>
                {this.props.liveJourneyMeta !== null ?
                    <div className={'blur-background blur'}
                         style={{
                             backgroundSize: 'cover',
                             backgroundImage: `url(${'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'})`
                         }}>


                    </div>
                    : null}
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