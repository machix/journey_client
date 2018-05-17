import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Icon from 'react-icon-base';
import Switch from "react-switch";

import agent from '../../../Helpers/agent';
import Header from '../../Header/Header';

import GridView from './GridView';
import ListView from './ListView';



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
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        //==================FETCH THE journey_id FROM THE PARAMS ==================>
        console.log('This is the path: ' + this.props.match.params.journey_id);
        // this.props.fetchJourneyMeta(this.props.match.params.journey_id);
        // this.props.fetchLiveJourney(this.props.match.params.journey_id);

        this.props.fetchJourneyThumbs(this.props.match.params.journey_id);
    }

    handleChange(checked) {
        this.setState({checked});
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
                <Header/>
                <div className={'profile-container'}>
                    <div className={'profile-info'}>
                    </div>
                    <div className={'profile-switch'}>

                        <span>
                        <Icon viewBox="0 0 40 40" size={20}>
                            <g>
                                <path
                                    d="m15 25v-10h10v10h-10z m-10-20h30v30h-30v-30z m27.5 10v-1.2h-6.2v-6.3h-1.3v6.3h-10v-6.3h-1.2v6.3h-6.3v1.2h6.3v10h-6.3v1.3h6.3v6.2h1.2v-6.2h10v6.2h1.3v-6.2h6.2v-1.3h-6.2v-10h6.2z"/>
                            </g>
                        </Icon>
                        </span>
                        <Switch
                            checked={this.state.checked}
                            onChange={this.handleChange}
                            onColor="#888"
                            onHandleColor="white"
                            handleDiameter={20}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 5px rgba(0, 0, 0, 0.2)"
                            height={15}
                            width={40}
                            className="react-switch"
                        />
                        <span>
                        <Icon viewBox="0 0 40 40" size={20}>
                            <g>
                                <path
                                    d="m5 5h30v30h-30v-30z m6.3 23.8c0.7 0 1.2-0.6 1.2-1.3s-0.5-1.2-1.2-1.2-1.3 0.5-1.3 1.2 0.5 1.3 1.3 1.3z m0-7.5c0.7 0 1.2-0.6 1.2-1.3s-0.5-1.2-1.2-1.2-1.3 0.5-1.3 1.2 0.5 1.3 1.3 1.3z m0-7.5c0.7 0 1.2-0.6 1.2-1.3s-0.5-1.2-1.2-1.2-1.3 0.5-1.3 1.2 0.5 1.3 1.3 1.3z m18.7 14.3v-1.2h-15v1.2h15z m0-7.5v-1.2h-15v1.2h15z m0-7.5v-1.2h-15v1.2h15z"/>
                            </g>
                        </Icon>
                        </span>
                    </div>

                    {this.state.checked === false ? <GridView/> : <ListView/>}


                </div>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
