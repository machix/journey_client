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

    doSomethingThenCall = (next) => {
        setTimeout(() => {
            next();
        }, 1000);
    }

    navigate = () => {
        history.push('/journey');
    }

    render() {
        return (
            <div className={'banner'}>
                <h1>People Doing Things Now</h1>
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

                    </div>
                    <div className={'map-container'}>
                        <MapContainer>
                        </MapContainer>
                    </div>
                </div>
                <div className={'banner-footer'}>
                    <div className={'journey-tags'}>Alaska, Travel, Adventure, Bike Trip, Shimano</div>
                    <div className={'awesome-button-container'}>
                        <AwesomeButtonProgress
                            action={(element, next) => this.doSomethingThenCall(next)}
                            successLabel={"Request Complete"}
                            type={'secondary'}>LIVE! Request An Update</AwesomeButtonProgress>
                    </div>
                </div>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FullJourneyBanner));
