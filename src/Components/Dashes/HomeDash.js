import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import ArrowKeysReact from 'arrow-keys-react';
import ReactDOM from 'react-dom';


import Chat from '../Chat/Chat';
import Sidebar from '../Sidebar/Sidebar';
import agent from '../../Helpers/agent';
import MapContainer from '../Map/MapContainer';

const mapStateToProps = state => ({
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    visibleMeta: state.choreographer.visibleMeta,
    position: state.choreographer.position,
    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,
    mapExpanded: state.common.mapExpanded,
    mapIsHover: state.common.mapIsHover,});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid)),
    setWindowDims: (width, height) => dispatch({
        type: 'SET_WINDOW_DIMS',
        windowWidth: width,
        windowHeight: height
    })
});

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

class HomeDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: true,
            // Auth vars
            auth: {},
            sidebarVisible: false,
            commands: ['Share, Donate, Contribute'],
            menuToggled: false,
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        ArrowKeysReact.config({
            left: () => {
                console.log('left arrow key pressed');
            },
            right: () => {
                console.log('right arrow key pressed');
            }
        });
    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        this.focusDiv();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.props.setWindowDims(window.innerWidth, window.innerHeight);
    }

    photosMap = () => {
        console.log('photosMap');
        return Object.keys(this.props.liveJourneyMeta).sort((a, b) => this.props.liveJourneyMeta[a].timeStamp - this.props.liveJourneyMeta[b].timeStamp).map((key, index) => {
            console.log(key, index);
            return
        });
    };

    toggle = (value) => {

        console.log('toggle: ' + value);
        switch (value) {
            case 'sidebar': {
                this.setState({
                    ...this.state,
                    sidebarVisible: !this.state.sidebarVisible
                });

                return;
            }
            case 'menu': {
                console.log('menu');
                this.setState({
                    ...this.state,
                    menuToggled: !this.state.menuToggled
                })
            }
        }

    };




    focusDiv() {
        ReactDOM.findDOMNode(this.focus).focus();
    }

    render() {
        return (
            <div className={"container"}
                 ref={(input) => {
                     this.focus = input;
                 }}
                 tabIndex="1"
                 {...ArrowKeysReact.events}   >
                <Motion style={{x: spring(this.state.sidebarVisible ? 30 : 0)}}>
                    {({x}) =>

                        <div className="sidebar-container" style={{
                            WebkitTransform: `translate3d(${x}vw, 0, 0)`,
                            transform: `translate3d(${x}vw, 0, 0)`,
                        }}>
                            <Sidebar></Sidebar>
                        </div>
                    }
                </Motion>

                <Chat commandsVisible={this.state.commandsVisible}/>

                <div className={'logo'} onClick={() => this.toggle('sidebar')}>
                    <img className={'logo-image'}
                         src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png"}/>
                </div>

                <div
                    onClick={() => this.toggle('menu')}
                    className={'menu'}>
                    <Motion style={{x: spring(this.state.menuToggled ? 90 : 0)}}>
                        {({x}) =>
                            <Icon viewBox="0 0 40 40" size={20}
                                  style={{color: 'white', transform: `rotate(${x}deg)`}}>
                                <g>
                                    <path
                                        d="m20 18.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m-10 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m20 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
                                </g>
                            </Icon>
                        }
                    </Motion>
                </div>


                <div className={"journey-container"}>
                    {this.props.liveJourneyMeta !== null ?
                        <Motion
                            style={{
                                marginControl: spring(this.props.mapExpanded ? 0 : 1),
                                toggleHeight: spring(this.props.mapExpanded ? 7 : 0),
                                hoverHeight: spring(this.props.mapExpanded ? 3 : 0),
                            }}>
                            {({hoverHeight, hoverRadius, toggleRadius, toggleHeight, marginControl}) =>
                                <img
                                    style={{
                                        left: 0,
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: `${this.props.windowWidth - ((10 * hoverHeight + toggleHeight * 5) / 100 * this.props.windowHeight)}px`,
                                        filter: this.state.sidebarVisible ? 'blur(2px)' : 'none'
                                    }}
                                    src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/>}
                        </Motion>
                        : null}

                   <MapContainer></MapContainer>
                </div>



                <div>
                    {this.props.liveJourneyMeta !== null ?
                        <div className={'blur-background blur'}
                             style={{
                                 backgroundSize: 'cover',
                                 backgroundImage: `url(${'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'})`
                             }}>

                        </div>
                        : null}
                    <div className={'blur-background-overlay'}>
                    </div>
                </div>
            </div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDash));

/*

*/


//<StatsPreview></StatsPreview>
//<GiftyPreviewSlide></GiftyPreviewSlide>
//<ShortSummary></ShortSummary>

//https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_' + this.props.liveJourneyMeta[3].uid + '.jpg?alt=media&token=6b901b9e-7265-4319-b0ba-2b8ca8a48878