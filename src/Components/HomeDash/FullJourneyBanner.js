import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import history from '../../Helpers/history';

import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import agent from '../../Helpers/agent';
import MapContainer from '../Map/MapContainer';
import ChatContainer from '../Chat/ChatContainer';
import Video from '../Video/Video';

import {AwesomeButtonProgress} from 'react-awesome-button';


import Header from '../Header/Header';


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


});


class FullJourneyBanner extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {}
    }

    doSomethingThenCall = (next) => {
        setTimeout(() => {
            next();
        }, 1000);
    }

    navigate = () => {
        history.push('/journey/test_journey');
    }

    render() {
        return (
            <div className={'banner'}>
                <h1></h1>
                <div className={'full-journey-banner'}>
                    <div
                        onClick={() => this.navigate()}
                        className={'left-container'}
                        style={{
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${'https://images.unsplash.com/photo-1495835788122-ca48931258be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=acc48b0187b28f7a221362b843f15755&auto=format&fit=crop&w=1650&q=80'})`
                        }}>
                        <div className={'journey-banner-title'}>
                            Alaska to Calgary
                        </div>

                        <div className={'journey-banner-description'}>
                            Doing a Bike Trip with My Buddy Yvan. Some things are better in the wild!
                        </div>

                        <div className={'journey-banner-time'}>
                            Last updated 2 minute ago
                        </div>

                    </div>
                    <div className={'map-container'}>

                    </div>
                </div>
                <div className={'banner-footer'}>
                    <div className={'journey-tags'}>Alaska, Travel, Adventure, Bike Trip, Shimano</div>
                    <div className={'awesome-button-container'}>

                    </div>
                </div>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullJourneyBanner));
