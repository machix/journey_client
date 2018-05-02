import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


import grill from '../Assets/014-grill.svg';
import agent from '../../Helpers/agent';
import Header from '../Header/Header';
import * as basicScroll from '../../Helpers/basicScroll.min';


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
        //     elem: document.querySelector('.small-asset'),
        //     from: 'top-bottom',
        //     to: 'middle-middle',
        //     props: {
        //         '--opacity': {
        //             from: .01,
        //             to: .99
        //         }
        //     }
        // })
        //
        //
        //
        // instance.start()

        const instances = []

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

                    <div className={'row'}>
                        <h1 style={{position: 'inline-block'}}>We know you like great adventures.</h1> <span>(cause we do too...)</span>
                        <p>
                            We also know that (some) adventures are better shared with others.<br/>
                            Track your progress and bring others along on your adventure.<br/>
                            <strong>Real-time and hands-free</strong>, so you can
                            enjoy the experience.
                        </p>

                        <p className={'col-med'}>
                            <br/>
                            <ul>
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

                            </ul>

                        </p>
                    </div>
                    <div className={'row'}>

                        <h1>We also want others to have great adventures.</h1>
                        <p>Need an extra person for that hut trip? An extra permit for that trail?
                            <br/>
                            <br/><span style={{fontSize: '1.3rem', textDecoration: 'underline', cursor: 'pointer'}}>Share and find a plan</span> to get out there.
                        </p>
                    </div>
                    <br/>
                    <div className={'row'}>

                        <h1>And... some extra <span
                            style={{color: '#13B57D'}}>coin</span> never hurt...<br/> <span
                            style={{color: '#13B57D'}}>coin</span> = more awesome adventures.</h1>
                        <p>Think you've got the recipe to a great adventure? Maybe you'd like to help the public get into
                            the outdoors? See if someone might pay some <span
                                style={{color: '#13B57D'}}><strong>coin </strong></span> for your recipe!

                        </p>
                        <p>
                            There are currently two types of ways you can do this.
                        </p>
                        <p>
                            <div className={'explorer-classes'}>
                                <div className={'explorer-container'}>
                                    <div className={'explorer-column'}>
                                        <div
                                            className={'explorer'}>EXPLORERS
                                        </div>
                                    </div>
                                    <div className={'explorer-column'}>

                                        <div className={'explorer-description'}>
                                            An explorer publishes <span
                                            style={{color: '#13B57D'}}><strong>Beta</strong></span> and <span
                                            style={{color: '#13B57D'}}><strong>Recipes</strong></span>. Docs that help people find their way.
                                        </div>
                                    </div>
                                </div>

                                <div className={'explorer-container'}>
                                    <div className={'explorer-column'}>

                                        <div
                                            className={'guide'}>GUIDES
                                        </div>
                                    </div>
                                    <div className={'explorer-column'}>
                                        <div className={'explorer-description'}>
                                            You like working with people? Introduce people to what you love yourself!
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>

                            As an
                            <div
                                className={'explorer'}>EXPLORER
                            </div>
                            or
                            <div className={'guide'}>GUIDE
                            </div>
                            make sure you <strong>broadcast live</strong> to help others & future interested individuals see
                            to see what it's like in adventure land.


                        </p>
                    </div>

                    <img src={grill} className={'small-asset'}/>

                </div>


            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
