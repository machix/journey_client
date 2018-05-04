import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as basicScroll from '../../Helpers/basicScroll.min';


import agent from '../../Helpers/agent';
import Header from '../Header/Header';
import grill from '../Assets/014-grill.svg';
import waypoint from '../Assets/039-sign-post.svg'
import coin from '../Assets/043-money.svg';
import photo from '../Assets/047-camera.svg';
import money from '../Assets/money.svg';
import metrics from '../Assets/growth.svg'
import youtube from '../Assets/youtube.svg';


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

    user: state.auth.user,


    position: state.choreographer.position,
    prevPosition: state.choreographer.prevPosition,
    nextPosition: state.choreographer.nextPosition,
    journeyId: state.choreographer.journeyId,
    alertNew: state.common.alertNew
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),

    setWindowDims: (width, height) => dispatch({
        type: 'SET_WINDOW_DIMS',
        windowWidth: width,
        windowHeight: height
    }),
    setSidebarExpanded: (value) => dispatch({
        type: 'SET_SIDEBAR_EXPANDED',
        value: value
    }),
    setArrowKey: (value) => dispatch({
        type: 'ARROW_KEY',
        value: value
    }),
    changePosition: (value) => dispatch({
        type: 'CHANGE_POSITION',
        value: value
    }),
    setAlertNew: (value) => dispatch({
        type: 'NEW_DATA',
        value: value
    }),


});

const duration = 300;


class About extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: true,
            // Auth vars
            auth: {},
            commands: ['Share, Donate, Contribute'],
            menuToggled: false,
            annotationVisible: false,
            infoBarExpanded: true,
            active: true
        }
    }

    componentDidMount() {
        console.log(basicScroll);
        // const instance = basicScroll.create({
        //     elem: document.querySelector('.list'),
        //     from: 'bottom-bottom',
        //     to: 'top-middle',
        //     props: {
        //         '--opacity-list': {
        //             from: .01,
        //             to: .99
        //         },
        //         '--tx': {
        //             from: '10px',
        //             to: 0
        //         },
        //     }
        // });
        // instance.start();

        const instanceWaypoint = basicScroll.create({
            elem: document.querySelector('.small-asset-waypoint'),
            from: 'top-middle',
            to: 'bottom-middle',
            direct: true,
            props: {
                '--r-waypoint': {
                    from: '0',
                    to: '1turn'
                },
                '--tx-waypoint': {
                    from: '-60vw',
                    to: '0'
                }
            }
        });
        instanceWaypoint.start();

        const featureContainer = basicScroll.create({
            elem: document.querySelector('.feature-container'),
            from: 'bottom-bottom',
            to: 'top-middle',
            direct: true,
            props: {
                '--ty-feature-container': {
                    from: '100px',
                    to: '0'
                },
                '--opacity-feature-container': {
                    from: 0,
                    to: 1
                }
            }
        });
        featureContainer.start();
        // const getOut = basicScroll.create({
        //     elem: document.querySelector('.get-out'),
        //     from: 'top-middle',
        //     to: 'bottom-middle',
        //     direct: true,
        //     props: {
        //         '--ty-get-out': {
        //             from: '10px',
        //             to: '0'
        //         },
        //         '--opacity-get-out': {
        //             from: 0,
        //             to: 1
        //         }
        //     }
        // });
        // getOut.start();

        const instanceCoin = basicScroll.create({
            elem: document.querySelector('.small-asset-coin'),
            from: 'bottom-bottom',
            to: 'top-middle',
            props: {
                '--ty-coin': {
                    from: '100px',
                    to: '0'
                },
                '--opacity-coin': {
                    from: 0,
                    to: 1
                }
            }
        });
        instanceCoin.start();

        const instances = [];

        const anchor = document.querySelector('.anchor')

// Create an animation for each border and letter
        document.querySelectorAll('.letter, .border').forEach((elem) => {

            // Get the end values from the data attributes
            const tx = elem.getAttribute('data-tx') + 'px'
            const ty = elem.getAttribute('data-ty') + 'px'
            const r = elem.getAttribute('data-r') + 'deg'

            // Crate an instance for the current element and store the instance in an array.
            // We start the animation later using the instances from the array.
            instances.push(basicScroll.create({
                elem: anchor,
                from: '0px',
                to: '200px',
                direct: elem,
                props: {
                    '--tx': {
                        from: '0',
                        to: tx
                    },
                    '--ty': {
                        from: '0',
                        to: ty
                    },
                    '--r': {
                        from: '0',
                        to: r
                    },
                    '--opacity': {
                        from: 1,
                        to: 0
                    }
                }
            }))

        })

        instances.forEach((instance) => instance.start())
    }

    render() {
        return (
            <div className={"container"}>
                {this.props.user !== null ?

                    <Header></Header> : null}

                <div className={'about-container'}>
                    <div className={'about-header'}>
                        <div className={'row'}>
                            <h1 className="headline">

                                <span className="border border--top" data-tx="-40" data-ty="20" data-r="-20"></span>
                                <span className="border border--right" data-tx="-10" data-ty="10" data-r="30"></span>
                                <span className="border border--bottom" data-tx="60" data-ty="0" data-r="40"></span>
                                <span className="border border--left" data-tx="50" data-ty="-80" data-r="20"></span>
                                <span className="letter" data-tx="-80" data-ty="-40" data-r="10">H</span>
                                <span className="letter" data-tx="-20" data-ty="50" data-r="-50">O</span>
                                <span className="letter" data-tx="50" data-ty="100" data-r="20"> W</span>
                                <span className="letter" style={{width: '1rem'}} data-tx="-30" data-ty="-100"
                                      data-r="-40"> </span>
                                <span className="letter" data-tx="20" data-ty="-20" data-r="5"> D</span>
                                <span className="letter" data-tx="80" data-ty="40" data-r="80"> O</span>
                                <span className="letter" data-tx="-80" data-ty="-40" data-r="10">E</span>
                                <span className="letter" data-tx="-20" data-ty="50" data-r="-50">S</span>
                                <span className="letter" style={{width: '1rem'}} data-tx="50" data-ty="100"
                                      data-r="20"> </span>
                                <span className="letter" data-tx="-30" data-ty="-100" data-r="-40">I</span>
                                <span className="letter" data-tx="20" data-ty="-20" data-r="5"> T</span>
                                <span className="letter" style={{width: '1rem'}} data-tx="-30" data-ty="-100"
                                      data-r="-40"></span>
                                <span className="letter" data-tx="20" data-ty="-20" data-r="5"> W</span>
                                <span className="letter" data-tx="80" data-ty="40" data-r="80"> O</span>
                                <span className="letter" data-tx="-80" data-ty="-40" data-r="10">R</span>
                                <span className="letter" data-tx="-20" data-ty="50" data-r="-50">K</span>
                                <span className="letter" data-tx="-20" data-ty="50" data-r="-50">?</span>

                            </h1>
                            <div className="anchor"></div>
                            <h2> It's pretty simple actually...</h2>
                        </div>
                    </div>
                    <div className={'about-content-container'}>

                        <div className={'row'}>
                            <div className={'conditional-nodisplay-desktop'}>
                                <img src={waypoint} className={'small-asset-waypoint'}/>
                                <img src={waypoint} className={'small-asset-placeholder'} style={{opacity: 0}}/>
                            </div>

                            <div className={'dynamic-row'}>
                                <div className={'intro-container'}>
                                    <h1 style={{position: 'inline-block'}}>We know you like great adventures.
                                        <div style={{fontSize: '1rem', paddingTop: '5px'}}> (cause we do too...) <span>
</span></div>
                                    </h1>
                                    <p>
                                        Track your progress and bring others along on your adventure
                                        <span><strong
                                            className={'highlight'}> real-time, and hands-free.</strong></span>
                                    </p>
                                </div>
                                <div className={'feature-column'}>
                                    <div className={'feature-container'} style={{position: 'absolute'}}>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: 'orange'}}>
                                                <img src={metrics}/>
                                            </div>
                                            Track relevant data (elevation, distance, etc).
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#FFDA44'}}>
                                                <img src={youtube}/>
                                            </div>
                                            Stream Live - Have users check in on your adventure.
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#FFDA44'}}>
                                                <img src={photo}/>
                                            </div>
                                            Collaborate with others on your Journey.
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#ADDFBA'}}>
                                                <img src={money}/>
                                            </div>
                                            Collect <span className={'highlight'}>coin</span> for your cause! <span
                                            style={{fontSize: '0.6rem'}}>(if applicable)</span>
                                        </div>
                                    </div>
                                    <div className={'feature-container placeholder'}>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: 'orange'}}>
                                                <img src={metrics}/>
                                            </div>
                                            Track relevant data (elevation, distance, etc).
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#FFDA44'}}>
                                                <img src={youtube}/>
                                            </div>
                                            Stream Live - Have users check in on your journey.
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#FFDA44'}}>
                                                <img src={photo}/>
                                            </div>
                                            Participate in collaborative Journeys sharing pictures & video
                                            collaboratively.
                                        </div>
                                        <div className={'feature'}>
                                            <div style={{backgroundColor: '#ADDFBA'}}>
                                                <img src={money}/>
                                            </div>
                                            Collect <span className={'highlight'}>coin</span> for your cause! <span
                                            style={{fontSize: '0.6rem'}}>(if applicable)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={'row row-plans'}>
                            <div className={'row-plans-background'}>
                            </div>
                            <div className={'plans-overlay'}>

                                <h1>And we also want others to have great adventures.</h1>
                                <div className={'plans-description'}>Need to find another person to walk
                                    across the southern
                                    states with you? <br/>Have an extra
                                    permit for
                                    that trail? Cool.
                                </div>

                                <div className={'get-out'}><div
                                    className={' get-out-button no-select'}>SHARE AND FIND A PLAN</div></div>
                            </div>


                        </div>
                        <br/>
                        <div className={'row'}>
                            <div>
                                <img src={coin} className={'small-asset-coin'}/>
                                <img src={coin} className={'small-asset-placeholder conditional-nodisplay-desktop'}
                                     style={{opacity: 0}}/>
                            </div>
                            <h1 style={{paddingTop: '30px'}}>And... earning some extra <span
                                style={{color: '#13B57D'}}>coin</span> never hurt...<br/> <span
                                style={{color: '#13B57D'}}>Coin</span> = more awesome adventures.</h1>
                            <p>You're out there all the time - others don't even know where to start. See if someone
                                might pay some <span
                                    className={'highlight'}><strong>coin </strong></span> for some of your expertise!

                                <br/><br/>
                                Share your <span className={'highlight'}>daily gear</span>,   <span className={'highlight'}>loadouts</span>, and <span className={'highlight'}> adventure tips</span> along the way.

                            </p>

                            <p>
                                <div className={'explorer-classes'}>
                                    <div className={'explorer-container'}>
                                        <div className={'explorer-column'}>
                                            <div
                                                className={'explorer pill'}>EXPLORERS
                                            </div>
                                        </div>
                                        <div className={'explorer-column'}>

                                            <div className={'explorer-description '}>
                                                An explorer publishes <span
                                                style={{color: '#13B57D'}}><strong>information/beta</strong></span> and
                                                <span
                                                    style={{color: '#13B57D'}}><strong> recipes</strong></span>.
                                                Information or inspiration with enough detail to help others find their
                                                way.
                                            </div>
                                        </div>
                                    </div>

                                    <div className={'explorer-container'}>
                                        <div className={'explorer-column'}>

                                            <div
                                                className={'guide pill'}>GUIDES
                                            </div>
                                        </div>
                                        <div className={'explorer-column'}>
                                            <div className={'explorer-description'}>
                                                Like working with people? Introduce people to what you love yourself!
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'explorer-container'}>
                                        <div className={'explorer-column'}>

                                            <div
                                                className={'waypoints pill'}>WAYPOINTS
                                            </div>
                                        </div>
                                        <div className={'explorer-column'}>
                                            <div className={'explorer-description'}>
                                                When others complete your Journey, they will earn a waypoint!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                As an
                                <div
                                    className={'explorer pill'}>EXPLORER
                                </div>
                                or
                                <div className={'guide pill'}>GUIDE
                                </div>
                                make sure you <span className="highlight">broadcast live</span> and regularly update your <span
                                className={"highlight"}>Journey</span> to help others see why your information is best information.

                            </p>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
/*          <ul className={'list'}>
                                    <li>&#9679; &emsp;Cheap Phone Mounts <span style={{fontSize: '0.7rem'}}> (or use some duct-tape)</span>
                                    </li>
                                    <li>&#9679; &emsp;Simple Adventure Data Capture (Distance, Elevation,
                                        etc).
                                    </li>
                                    <li>&#9679; &emsp;Shared Adventure Experiences</li>
                                    <li>&#9679; &emsp;Collect <span
                                        style={{color: '#13B57D'}}><strong>funds </strong></span>
                                        for any <span style={{color: '#13B57D'}}><strong>needs/causes </strong></span>if
                                        applicable.
                                    </li>

                                </ul>*/