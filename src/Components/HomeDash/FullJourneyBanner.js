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
import MapContainer from '../Map/MapContainer';
import ChatContainer from '../Chat/ChatContainer';
import Video from '../Video/Video';
import Header from '../Header/Header';


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

    position: state.choreographer.position,
    prevPosition: state.choreographer.prevPosition,
    nextPosition: state.choreographer.nextPosition,
    journeyId: state.choreographer.journeyId,
    alertNew: state.common.alertNew
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),


});


class FullJourneyBanner extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div className={'full-journey-banner banner'}
                 style={{
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundImage: `url(${'https://images.unsplash.com/photo-1495835788122-ca48931258be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acc48b0187b28f7a221362b843f15755&auto=format&fit=crop&w=1650&q=80'})`
                 }}>
                <div className={'journey-banner-title'}>
                    Alaska to Calgary
                </div>

                <div className={'journey-banner-description'}>
                    Doing a Bike Trip with My Buddy Yvan.
                </div>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullJourneyBanner));
