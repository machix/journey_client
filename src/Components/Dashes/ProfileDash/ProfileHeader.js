import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-icon-base';


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
        this.state = {
            loading: true,

        };
    }

    componentDidMount() {
        setTimeout(() => this.setState({loading: false}), 2000)
    }


    render() {
        return (

            <div className={'profile-info'}>
                <div className={'background-image'}>
                </div>

                <div className={'stats-container'}>
                    <div className={'stats-title'}>
                        Live Stats
                    </div>
                    <div className={'stat'}>
                        <div className={'stat-top'}>
                            <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                                <g>
                                    <path
                                        d="m5 22.5h33.5q0.5 0 0.9 0.4t0.3 0.8v8.7h-4.9v-4.9h-29.8v4.9h-5v-23.6q0-0.5 0.4-0.9t0.8-0.3h2.5q0.5 0 0.9 0.3t0.4 0.9v13.7z m11.1-6.2q0-2.1-1.4-3.5t-3.5-1.5-3.5 1.5-1.5 3.5 1.5 3.5 3.5 1.4 3.5-1.4 1.4-3.5z m23.7 4.9v-1.2q0-3.1-2.2-5.3t-5.3-2.2h-13.7q-0.5 0-0.8 0.4t-0.4 0.9v7.4h22.4z"/>
                                </g>
                            </Icon>

                        </div>
                        <div className={'stat-bottom'}>
                            3 days
                        </div>
                    </div>
                    <div className={'stat'}>
                        <div className={'stat-top'}>
                            <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                                <g>
                                    <path
                                        d="m34.1 5c0.5 0 0.9 0.4 0.9 0.9v25.1c0 0.4-0.2 0.7-0.5 0.8l-9.5 3.2-10-3.5s-8.2 3.2-8.4 3.3-0.6 0.2-0.7 0.2c-0.5 0-0.9-0.4-0.9-0.9v-25.1c0-0.4 0.2-0.7 0.5-0.8l9.5-3.2 10 3.5s8-3.1 8.4-3.3 0.6-0.2 0.7-0.2z m-9.1 26.6v-19.8l-10-3.4v19.8z"/>
                                </g>
                            </Icon>
                        </div>
                        <div className={'stat-bottom'}>
                            8800 kms
                        </div>
                    </div>
                    <div className={'stat'}>
                        <div className={'stat-top'}>
                            <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                                <g>
                                    <path
                                        d="m21 16.3h-2.5v5h-5v2.5h5v5h2.5v-5h5v-2.5h-5v-5z m1.3-1.3v5h5v5h-5v5h-5v-5h-5v-5h5v-5h5z m3.7-5h10v25h-32.5v-25h10v-2.5c0-1.4 0.8-2.5 2.3-2.5h7.7c1.5 0 2.5 1.1 2.5 2.5v2.5z m-11.2-2.3v2.3h10v-2.3c0-0.8-0.6-1.4-1.4-1.4h-7.6c-0.8 0-1 0.6-1 1.4z m20 26.1v-22.5h-30v22.5h30z"/>
                                </g>
                            </Icon>

                        </div>
                        <div className={'stat-bottom'}>
                            3 Contributions
                        </div>
                    </div>
                    <div className={'stat'}>
                        <div className={'stat-top'}>

                            <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                                <g>
                                    <path
                                        d="m39.8 32.4v2.5h-39.8v-29.8h2.5v27.3h37.3z m-7.5-19.9l5 17.4h-32.3v-11.1l8.7-11.2 11.1 11.2z"/>
                                </g>
                            </Icon>
                        </div>
                        <div className={'stat-bottom'}>
                            9900 m total elevation change
                        </div>
                    </div>
                </div>
                <div className={'title'}>
                    Alaska to Calgary
                    <div className={'sub'}>
                        Start Date: July 18, 2017
                    </div>
                </div>
                <div className={'description'}>
                    A trip that explores the idea of an "always-online", passively-logged experience for an
                    authentically shared good time.
                </div>

                {this.state.loading ?
                    <div style={{height: '2.5em', display: 'flex', alignItems: 'center', marginTop: '50px'}}>
                        <div className={'loader'}></div>
                        <span style={{
                            paddingLeft: '3em',
                            fontWeight: 'bold',
                            fontSize: '1rem'
                        }}>CHECKING AVAILABILITY</span>
                    </div> :
                    <div className={'action-button-container'}>
                        <div className={'action-button-group'}>
                            <div className={'action-description'}>
                            </div>
                            <div className={'action-button'}>
                                Online Now! Take a Look at the Trip Live!
                            </div>
                        </div>
                        <div className={'action-button-group'}>
                            <div className={'action-description'}>

                            </div>
                            <div className={'action-button donation'}>
                                <Icon viewBox="0 0 40 40" size={20} style={{marginRight: '5px'}}>
                                    <g>
                                        <path
                                            d="m21 16.3h-2.5v5h-5v2.5h5v5h2.5v-5h5v-2.5h-5v-5z m1.3-1.3v5h5v5h-5v5h-5v-5h-5v-5h5v-5h5z m3.7-5h10v25h-32.5v-25h10v-2.5c0-1.4 0.8-2.5 2.3-2.5h7.7c1.5 0 2.5 1.1 2.5 2.5v2.5z m-11.2-2.3v2.3h10v-2.3c0-0.8-0.6-1.4-1.4-1.4h-7.6c-0.8 0-1 0.6-1 1.4z m20 26.1v-22.5h-30v22.5h30z"/>
                                    </g>
                                </Icon>
                                We're eating beans. Provide a meal on the road :) $5
                            </div>
                        </div>
                    </div>}

            </div>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
