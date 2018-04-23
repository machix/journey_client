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
import ChatContainer from '../Chat/ChatContainer';
import Video from '../Video/Video';
import Header from '../Header/Header';
import FullJourneyBanner from '../HomeDash/FullJourneyBanner';
import Login from '../Common/Login';


const mapStateToProps = state => ({
    chatExpanded: state.common.chatExpanded,
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,
    sidebarExpanded: state.common.sidebarExpanded,
    arrowKey: state.common.arrowKey,

    user: state.auth.user,


    position: state.choreographer.position,
    prevPosition: state.choreographer.prevPosition,
    nextPosition: state.choreographer.nextPosition,
    journeyId: state.choreographer.journeyId,
    alertNew: state.common.alertNew
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
    }

    render() {
        return (
            <div className={"container"}
                 ref={(input) => {
                     this.focus = input;
                 }}
                 tabIndex="1"
                 {...ArrowKeysReact.events}   >
                {this.props.user !== null ?

                    <Header></Header> : null}
                <Login></Login>
                <div className={'home-container'}>

                    {this.props.user !== null ?
                        <div className={'start-now-banner'}>
                            <h1>Start Your Journey</h1>
                            <h3>A Journey begins anywhere. Connect <b><u>people,</u> <u>places</u></b> and <b><u>things</u></b> to track your own Journey.
                            </h3>

                            <div className={'start-now'}>
                                <div className={'left'}>
                                    START NOW
                                </div>
                                <div className={'right'}>
                                    <Icon viewBox="0 0 40 40" style={{color: 'white'}} size={25}>
                                        <g>
                                            <path
                                                d="m25 10l7.8 8.2c0.5 0.5 0.7 1.1 0.7 1.8s-0.2 1.3-0.7 1.7l-7.8 8.3c-1 0.9-2.4 0.9-3.4 0s-0.9-2.7 0-3.6l3.8-3.9h-17c-1.3 0-2.4-1.1-2.4-2.5s1.1-2.5 2.4-2.5h17l-3.9-3.9c-0.9-0.9-0.9-2.7 0-3.6s2.5-0.9 3.5 0z"/>
                                        </g>

                                    </Icon>
                                </div>
                            </div>
                        </div> : null}


                    <FullJourneyBanner>

                    </FullJourneyBanner>

                    <h1>Active Experiences Near You</h1>

                </div>


            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDash));
