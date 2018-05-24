import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-icon-base';


import agent from '../../../Helpers/agent';
import Statistics from './statistics';
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


                <Statistics displayMobile={false}></Statistics>
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
                    <div className={'action-button-container'}>
                        <div style={{height: '2.5em', display: 'flex', alignItems: 'center', marginTop: '50px'}}>
                            <div className={'loader'}></div>
                            <span style={{
                                paddingLeft: '3em',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}>CHECKING AVAILABILITY</span>
                        </div>
                    </div> :
                    <div className={'action-button-container'}>
                        <div className={'action-button-group'}>
                            <div className={'action-button'}>
                                Take a Look Now!
                            </div>
                        </div>
                        <div className={'action-button-group'}>

                            <div className={'action-button donation'}>
                                <div className={'action-icon'}>
                                    <Icon viewBox="0 0 40 40" size={20} style={{marginRight: '5px',}}
                                          className={'action-icon'}>
                                        <g>
                                            <path
                                                d="m21 21.3h5v2.5h-5v5h-2.5v-5h-5v-2.5h5v-5h2.5v5z m5-11.3h10v25h-32.5v-25h10v-2.5c0-1.4 0.8-2.5 2.3-2.5h7.7c1.5 0 2.5 1.1 2.5 2.5v2.5z m-11.2-2.3v2.3h10v-2.3c0-0.8-0.6-1.4-1.4-1.4h-7.6c-0.8 0-1 0.6-1 1.4z m12.5 17.3v-5h-5v-5h-5v5h-5v5h5v5h5v-5h5z"/>
                                        </g>

                                    </Icon>
                                </div>
                                Looking for Handouts <span style={{fontSize: '0.5rem'}}> &emsp; (ie. food)</span>
                            </div>
                        </div>
                    </div>}


            </div>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);

