import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import moment from 'moment';

import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import agent from '../../Helpers/agent';
import MapContainer from '../Map/JourneyMapContainer';
import JourneyMapContainerSmall from '../Map/JourneyMapContainerSmall';

import ChatContainer from '../Chat/ChatContainer';
import Video from '../Video/Video';


const mapStateToProps = state => ({
    chatExpanded: state.common.chatExpanded,
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyData: state.common.liveJourneyData,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,
    sidebarExpanded: state.common.sidebarExpanded,
    arrowKey: state.common.arrowKey,

    position: state.choreographer.position,
    prevPosition: state.choreographer.prevPosition,
    nextPosition: state.choreographer.nextPosition,
    journeyId: state.choreographer.journeyId,
    alertNew: state.common.alertNew
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    fetchJourneyMeta: (journey_uid) => dispatch(agent.FireStoreQuery.fetchJourneyMeta(journey_uid)),


    setWindowDims: (width, height) => dispatch({
        type: 'SET_WINDOW_DIMS',
        windowWidth: width,
        windowHeight: height
    }),
    setSidebarExpanded: (value) => dispatch({
        type: 'SET_SIDEBAR_EXPANDED',
        value: value
    }),
    setArrowKey: (value) => dispatch({
        type: 'ARROW_KEY',
        value: value
    }),
    changePosition: (value) => dispatch({
        type: 'CHANGE_POSITION',
        value: value
    }),
    setAlertNew: (value) => dispatch({
        type: 'NEW_DATA',
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
            active: true
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        ArrowKeysReact.config({
            left: () => {
                if (this.props.position === 0) {

                } else {
                    this.props.changePosition(this.props.position - 1);
                    this.props.setArrowKey('left');
                    setTimeout(()=>this.props.setArrowKey(null), 300);
                }
            },
            right: () => {
                if (this.props.position === this.props.liveJourneyData.length - 1) {
                } else {
                    this.props.setArrowKey('right');
                    this.props.changePosition(this.props.position + 1);
                    setTimeout(()=>this.props.setArrowKey(null), 300);

                }

            }
        });
    }

    componentWillMount() {
        //==================FETCH THE journey_id FROM THE PARAMS ==================>
        this.props.fetchJourneyMeta(this.props.match.params.journey_id);

        this.props.fetchLiveJourney(this.props.match.params.journey_id);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);

        this.focusDiv();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.liveJourneyData.length !== this.props.liveJourneyData.length && this.props.liveJourneyData.length > 0) {
            console.log('There is a new submission');
            this.props.setAlertNew(true);
            this.props.changePosition(this.props.position + 1);
        }


    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.props.setWindowDims(window.innerWidth, window.innerHeight);
    }

    blur() {
        this.props.setSidebarExpanded()
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

    photosMap = () => {
        return Object.keys(this.props.liveJourneyData).sort((a, b) => this.props.liveJourneyData[a].timeStamp - this.props.liveJourneyData[b].timeStamp).map((key, index) => {
            return
        });
    };

    navButtonClick = (value) => {
        console.log(value);
        if (this.props.position === 0 && value === 'left') {
        } else if (value === 'left') {
            this.props.changePosition(this.props.position - 1);
            setTimeout(()=>this.props.setArrowKey(null), 300);

        } else if (this.props.position < this.props.liveJourneyData.length - 1 && value === 'right') {
            this.props.changePosition(this.props.position + 1);
            setTimeout(()=>this.props.setArrowKey(null), 300);

        } else {

        }

    }

    toggle = (value) => {

        console.log('toggle: ' + value);
        switch (value) {
            case 'menu': {
                this.setState({
                    ...this.state,
                    menuToggled: !this.state.menuToggled
                })
                return;
            }
            case 'annotation': {
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

    done() {
        this.props.setArrowKey(null)
    }

    render() {
        return (
            <div className={"container"}
                 ref={(input) => {
                     this.focus = input;
                 }}
                 tabIndex="1"
                 {...ArrowKeysReact.events}   >
                <Motion style={{x: spring(this.props.sidebarExpanded ? this.props.windowWidth < 800 ? 100 : 30 : 0)}}>
                    {({x}) =>

                        <div className="sidebar-container"
                             style={{
                                 WebkitTransform: `translate3d(${x}vw, 0, 0)`,
                                 transform: `translate3d(${x}vw, 0, 0)`,
                             }}>
                            <Sidebar></Sidebar>
                        </div>
                    }
                </Motion>


                {this.props.liveJourneyData.length > 0 ?
                    <div className={'logo'} onClick={() => this.props.setSidebarExpanded(!this.props.sidebarExpanded)}>
                        <img className={'logo-image'}
                             src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png"}/>

                        <img
                            src={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.prevPosition].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523`}
                            className={'load-next'}/>
                        <img
                            src={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.nextPosition].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523`}
                            className={'load-next'}/>
                    </div> : null}

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

                <div className={'journey-container'}>
                    <Chat
                        commandsVisible={this.state.commandsVisible}/>
                    <div className={"journey-mobile-container"}>


                        <Transition
                            unmountOnExit={false}
                            in={this.props.arrowKey === 'left'}
                            // onEntered={() => this.props.setArrowKey(null)}
                            timeout={{enter: 400, exit: 0}}>
                            {(state) => (
                                <div className={`button button-${state}`}
                                     onMouseLeave={() => this.props.setArrowKey(null)}
                                     onClick={() => this.navButtonClick('left')}
                                     onMouseOver={() => this.props.setArrowKey('left')}>
                                    <Icon viewBox="0 0 40 40" size={20} style={{color: 'white'}}>
                                        <g>
                                            <path
                                                d="m16.7 20l13.1 13.6c0.3 0.3 0.3 0.9 0 1.2l-2.4 2.5c-0.3 0.3-0.9 0.3-1.2 0l-16-16.7c-0.1-0.1-0.2-0.4-0.2-0.6s0.1-0.5 0.2-0.6l16-16.7c0.3-0.3 0.9-0.2 1.2 0.1l2.4 2.4c0.3 0.3 0.3 0.9 0 1.2l-13.1 13.6z"/>
                                        </g>
                                    </Icon>
                                </div>)}
                        </Transition>

                        <Transition
                            unmountOnExit={false}
                            in={this.props.arrowKey === 'right'}
                            // onEntered={() => this.props.setArrowKey(null)}
                            timeout={{enter: 400, exit: 0}}>
                            {(state) => (
                                <div className={`button button-${state} right`}
                                     onClick={() => this.navButtonClick('right')}

                                     onMouseLeave={() => this.props.setArrowKey(null)}
                                     onMouseOver={() => this.props.setArrowKey('right')}>
                                    <Icon viewBox="0 0 40 40" size={20} style={{color: 'white'}}>
                                        <g>
                                            <path
                                                d="m23.3 20l-13.1-13.6c-0.3-0.3-0.3-0.9 0-1.2l2.4-2.4c0.3-0.3 0.9-0.4 1.2-0.1l16 16.7c0.1 0.1 0.2 0.4 0.2 0.6s-0.1 0.5-0.2 0.6l-16 16.7c-0.3 0.3-0.9 0.3-1.2 0l-2.4-2.5c-0.3-0.3-0.3-0.9 0-1.2z"/>
                                        </g>
                                    </Icon>
                                </div>
                            )}
                        </Transition>
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
                                    <div onClick={() => agent.Auth.logout()} className={"title"}>Climbing Everest</div>
                                    <div className={"subText"}>Day 12: Going up the North Face of the mountain in record
                                        time!
                                        Without oxygen and without my balls.
                                    </div>
                                    <div className={'check-in'}>
                                        <div className={'check-in-container'}>
                                            <div className={'check-in-container  hvr-grow'}>
                                                <div className={'image-container'}>
                                                    <div className={'image'}
                                                         style={{
                                                             backgroundSize: 'cover',
                                                             backgroundImage: `url(${'https://s.hswstatic.com/gif/sherpa-125217967.jpg'})`
                                                         }}
                                                    >
                                                    </div>
                                                </div>
                                                <div className={'description-container'}>
                                                    <div className={'name'}>
                                                        Annunu Sherpa
                                                    </div>
                                                    <div className={'description'}>
                                                        <strong>Contribution - 7 Day Service</strong><br/>
                                                        High Quality Sherpa Services<br/>
                                                        Nepalese Culture<br/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Transition>


                        {this.props.liveJourneyData ?
                            <Motion
                                className={'conditional-nodisplay'}
                                style={{
                                    marginControl: spring(this.props.mapExpanded ? 0 : 1),
                                    toggleHeight: spring(this.props.mapExpanded ? 7 : 0),
                                    hoverHeight: spring(this.props.mapExpanded ? 3 : 0),
                                }}>
                                {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>


                                    <div style={{
                                        height: this.props.windowWidth > 800 ? '100vh' : '100%',
                                        minHeight: '70vh',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        {this.props.liveJourneyData.length > 0 && this.props.liveJourneyData[this.props.position].type === "video" ?
                                            <Video

                                                url={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2F${this.props.liveJourneyData[this.props.position].uid}.mp4?alt=media&token=9f9e06ad-db93-4a22-bdfb-fed973efd936`}/> : null}

                                        {this.props.liveJourneyData.length > 0 && this.props.liveJourneyData[this.props.position].type === "image" ?

                                            <div style={{
                                                height: '100%',
                                                width: `${this.props.windowWidth - ((10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight)}px`,
                                                backgroundSize: 'contain',
                                                backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.position].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523)`,
                                                //'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center'
                                            }}
                                                 onClick={() => {
                                                     this.blur()
                                                 }}
                                            >

                                            </div> : null}
                                    </div>}
                            </Motion>
                            : null}

                        <MapContainer></MapContainer>


                        {this.props.chatExpanded ? <ChatContainer></ChatContainer> : null}
                    </div>

                    <JourneyMapContainerSmall></JourneyMapContainerSmall>
                </div>


                <div>
                    {this.props.liveJourneyData.length > 0 ?

                        <div className={'blur-background blur'}
                             onClick={() => {
                                 this.blur()
                             }}
                             style={{
                                 backgroundSize: 'cover',
                                 backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.position].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523)`,
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

//https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_' +


/* <Transition
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
                                                {this.props.alertNew === true ?
                                                    <div>YOU GOT A NEW PICTURE BITCH!</div> : null}
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
                                        )}
                                    </Transition>*/