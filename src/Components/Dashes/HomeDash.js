import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';

import member3 from '../Assets/member2.jpg';

import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import agent from '../../Helpers/agent';
import MapContainer from '../Map/MapContainer';

const mapStateToProps = state => ({
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    visibleMeta: state.choreographer.visibleMeta,
    position: state.choreographer.position,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,
    sidebarExpanded: state.common.sidebarExpanded,

});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    setWindowDims: (width, height) => dispatch({
        type: 'SET_WINDOW_DIMS',
        windowWidth: width,
        windowHeight: height
    }),
    setSidebarExpanded: (value) => dispatch({
        type: 'SET_SIDEBAR_EXPANDED',
        value: value
    }),

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
            commands: ['Share, Donate, Contribute'],
            menuToggled: false,
            annotationVisible: false,
            infoBarExpanded: true,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        ArrowKeysReact.config({
            left: () => {
                console.log('left arrow key pressed');
            },
            right: () => {
                console.log('right arrow key pressed');
            }
        });
    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.focusDiv();
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

        console.log('toggle: ' + value);
        switch (value) {
            case 'menu': {
                console.log('menu');
                this.setState({
                    ...this.state,
                    menuToggled: !this.state.menuToggled
                })
                return;
            }
            case 'annotation': {
                console.log('annotation');
                this.setState({
                    ...this.state,
                    annotationVisible: !this.state.annotationVisible
                });
                return;
            }
        }

    };


    focusDiv() {
        ReactDOM.findDOMNode(this.focus).focus();
    }

    render() {
        return (
            <div className={"container"}
                 ref={(input) => {
                     this.focus = input;
                 }}
                 tabIndex="1"
                 {...ArrowKeysReact.events}   >
                <Motion style={{x: spring(this.props.sidebarExpanded ? 30 : 0)}}>
                    {({x}) =>

                        <div className="sidebar-container" style={{
                            WebkitTransform: `translate3d(${x}vw, 0, 0)`,
                            transform: `translate3d(${x}vw, 0, 0)`,
                        }}>
                            <Sidebar></Sidebar>
                        </div>
                    }
                </Motion>

                <Chat commandsVisible={this.state.commandsVisible}/>

                <div className={'logo'} onClick={() => this.props.setSidebarExpanded(!this.props.sidebarExpanded)}>
                    <img className={'logo-image'}
                         src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png"}/>
                </div>

                <div
                    onClick={() => this.toggle('menu')}
                    className={'menu'}>
                    <Motion style={{x: spring(this.state.menuToggled ? 90 : 0)}}>
                        {({x}) =>
                            <Icon viewBox="0 0 40 40" size={20}
                                  style={{color: 'white', transform: `rotate(${x}deg)`}}>
                                <g>
                                    <path
                                        d="m20 18.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m-10 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m20 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
                                </g>
                            </Icon>
                        }
                    </Motion>
                </div>


                <div className={"journey-container"}>

                    <Transition
                        unmountOnExit={true}
                        style={{height: '100%'}}
                        in={this.state.menuToggled}
                        out={!this.state.menu}
                        timeout={200}>
                        {(state) => (
                            <div className={`annotation-${state} annotation`}>
                                <div className={"close"} onClick={() => this.toggle('menu')}>
                                    <Icon viewBox="0 0 40 40" size={15} style={{color: 'white'}}>
                                        <g>
                                            <path
                                                d="m34.7 30.2c0.2 0.3 0.3 0.5 0.3 0.8s-0.1 0.6-0.3 0.8l-3 2.9c-0.2 0.2-0.4 0.3-0.7 0.3s-0.5-0.1-0.8-0.3l-10.2-10.2-10.2 10.2c-0.3 0.2-0.4 0.3-0.7 0.3s-0.6-0.1-0.8-0.3l-3-2.9c-0.2-0.2-0.3-0.5-0.3-0.8s0.1-0.5 0.3-0.8l10.3-10.2-10.3-10.2c-0.4-0.3-0.4-1.1 0-1.5l2.9-3c0.2-0.1 0.5-0.3 0.8-0.3s0.5 0.1 0.8 0.3l10.2 10.2 10.2-10.2c0.3-0.1 0.5-0.3 0.8-0.3s0.6 0.1 0.8 0.3l2.9 3c0.4 0.4 0.4 1.1 0 1.5l-10.3 10.1z"/>
                                        </g>
                                    </Icon>
                                </div>
                                <div className={"title"}>Climbing Everest</div>
                                <div className={"subText"}>Day 12: Going up the North Face of the mountain in record
                                    time!
                                    Without oxygen and without my balls.
                                </div>
                                <div className={'check-in'}>
                                    Check-Ins:
                                    <div style={{display: 'flex', paddingTop: '5px'}}>
                                        <div className={'image-container'}>
                                            <div className={'image'}
                                                 style={{
                                                     backgroundSize: 'cover',
                                                     backgroundImage: `url(${'https://s.hswstatic.com/gif/sherpa-125217967.jpg'})`
                                                 }}
                                            >
                                            </div>
                                        </div>
                                        <div className={'check-in-container'}>
                                            <div className={'name'}>
                                                Annunu Sherpa
                                            </div>
                                            <div className={'description'}>
                                                Service - $$
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Transition>


                    {this.props.liveJourneyMeta !== null ?
                        <Motion
                            style={{
                                marginControl: spring(this.props.mapExpanded ? 0 : 1),
                                toggleHeight: spring(this.props.mapExpanded ? 7 : 0),
                                hoverHeight: spring(this.props.mapExpanded ? 3 : 0),
                            }}>
                            {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>


                                <div>
                                    <Transition
                                        unmountOnExit={true}
                                        in={this.state.infoBarExpanded}
                                        out={!this.state.menu}
                                        timeout={200}>
                                        {(state) => (



                                            <div className={`info-panel annotation-${state}`}>
                                                <div className={'image-container'}>
                                                    <div className={'image-background'}>
                                                        <img className={'image'} src={member3}/>
                                                    </div>
                                                </div>
                                                <div className={'info-container'}>
                                                    13 Minutes Ago
                                                    <div>
                                                        <Icon viewBox="0 0 40 40" size={20}
                                                              style={{color: 'white'}}>
                                                            <g>
                                                                <path
                                                                    d="m19.8 3.8c-2.7 0-5.3 1-7.2 2.8s-2.8 4.5-2.8 7.2c0 3.3 1.8 8.3 5.4 14.5 1.7 3 3.5 5.6 4.6 7.1 1-1.5 2.8-4.1 4.5-7.1 3.6-6.2 5.5-11.2 5.5-14.5 0-2.7-1.1-5.3-2.9-7.2s-4.5-2.8-7.1-2.8z m0-1.3c6.2 0 11.2 5 11.2 11.3 0 8.7-11.2 23.7-11.2 23.7s-11.3-15-11.3-23.7c0-6.3 5-11.3 11.3-11.3z m0 6.3c2.7 0 5 2.2 5 5s-2.3 5-5 5-5-2.3-5-5 2.2-5 5-5z m0 8.6c2 0 3.6-1.6 3.6-3.6s-1.6-3.7-3.6-3.7-3.7 1.6-3.7 3.7 1.6 3.6 3.7 3.6z"/>
                                                            </g>
                                                        </Icon>
                                                        Everest Base Camp <br/>
                                                        28.003514, 86.852070

                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </Transition>


                                    <img
                                        style={{
                                            left: 0,
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            width: `${this.props.windowWidth - ((10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight)}px`,
                                            filter: this.props.sidebarExpanded ? 'blur(2px)' : 'none'
                                        }}
                                        src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/>
                                </div>}
                        </Motion>
                        : null}

                    <MapContainer></MapContainer>
                </div>


                <div style={{height: '100%'}}>
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