import React, {Component} from 'react';
import {connect} from 'react-redux';



import agent from '../../../Helpers/agent';
import FancyButton from './FancyButton';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    fetchJourneyMeta: (journey_uid) => dispatch(agent.FireStoreQuery.fetchJourneyMeta(journey_uid)),

    fetchJourneyThumbs: (journey_uid) => dispatch(agent.common.getMultipleUnsplash(journey_uid))


});


class ProfileHeader extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
    }


    render() {
        return (

            <div className={'profile-info'}>
                <div className={'title'}>
                    <FancyButton/>
                </div>
                <div className={'description'}>
                    Trip Start: July 18, 2017
                </div>
            </div>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
