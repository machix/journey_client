import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Header from '../../Header/Header';

import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';
import Transition from 'react-transition-group/Transition';
import moment from 'moment';
import Switch from "react-switch";
import Overdrive from 'react-overdrive';

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


class ListView extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        this.state = {checked: false};
    }

    renderList = () => {
        return this.props.thumbnails.map((currElement, index) => {
            console.log("The current iteration is: " + index);
            console.log("The current element is: " + currElement);
            console.log(currElement.urls)
            return <div className={'gallery-list-item'}>
                <Overdrive id={index} style={{height: '100%', position: 'relative'}} >
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
                <div className={"list-information-container"}>
                    <h1>JANUARY 2, 2018</h1>
                    This is some miscellaneous information
                </div>

            </div>

        })
    };


    render() {
        return (

            <div className={'gallery-list'}>
                {this.props.thumbnails.length > 0 ? this.renderList() : null}
            </div>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView);
