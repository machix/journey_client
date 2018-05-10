import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from '../Header/Header';

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
    alertNew: state.common.alertNew,

    thumbnails: state.profile.thumbnails
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    fetchJourneyMeta: (journey_uid) => dispatch(agent.FireStoreQuery.fetchJourneyMeta(journey_uid)),

    fetchJourneyThumbs: (journey_uid) => dispatch(agent.common.getMultipleUnsplash(journey_uid))


});

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}


class Profile extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount() {
        //==================FETCH THE journey_id FROM THE PARAMS ==================>
        console.log('This is the path: ' + this.props.match.params.journey_id);
        // this.props.fetchJourneyMeta(this.props.match.params.journey_id);
        // this.props.fetchLiveJourney(this.props.match.params.journey_id);

        this.props.fetchJourneyThumbs(this.props.match.params.journey_id);
    }

    renderThumbnails = () => {
        return this.props.thumbnails.map((currElement, index) => {
            console.log("The current iteration is: " + index);
            console.log("The current element is: " + currElement);
            console.log(currElement.urls)
            return <div

                className={'gallery-image-parent'}>
                <div className={'gallery-image-child'}
                     style={{
                         backgroundImage: `url(${currElement.urls.small})`,
                     }}>
                    &emsp;
                </div>
            </div>
        })
    };


    render() {
        return (
            <div className={"container"}>
                <Header></Header>

                <div className={'gallery-container'}>
                    {this.props.thumbnails.length > 0 ? this.renderThumbnails() : null}
                </div>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
