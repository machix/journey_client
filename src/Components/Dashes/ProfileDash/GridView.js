import React, {Component} from 'react';
import {connect} from 'react-redux';
import Overdrive from 'react-overdrive'


import agent from '../../../Helpers/agent';


const mapStateToProps = state => ({

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
    }

    renderThumbnails = () => {
        return this.props.thumbnails.map((currElement, index) => {

            return <Overdrive id={index} style={{height: '100%', position: 'relative'}}>
                <div
                    className={'gallery-image-parent'}>

                    <div className={'gallery-image-child'}
                         style={{
                             backgroundImage: `url(${currElement.urls.small})`,
                         }}>
                        &emsp;
                    </div>
                </div>
            </Overdrive>

        })
    };


    render() {
        return (

            <div className={'gallery-grid'}>
                {this.props.thumbnails.length > 0 ? this.renderThumbnails() : null}
            </div>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
