import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Motion, spring} from 'react-motion'
import Icon from 'react-icon-base';
import Transition from 'react-transition-group/Transition';


import Sidebar from '../Sidebar/Sidebar';
import Map from '../Map/Map';
import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    loaderDisplay: state.common.loaderDisplay,
    liveJourneyMeta: state.common.liveJourneyMeta,
    visibleMeta: state.choreographer.visibleMeta,
    position: state.choreographer.position
});

const mapDispatchToProps = dispatch => ({
    fetchLiveJourney: (journey_uid) => dispatch(agent.FirebaseQuery.liveJourney(journey_uid))
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
            visible: false,
            isHover: false,
            commandsVisible: false,
            commands: ['Share, Donate, Contribute']

        }
    }

    componentWillMount() {
        this.props.fetchLiveJourney('test_journey');
    }

    componentWillReceiveProps(nextProps) {

    }

    photosMap = () => {
        console.log('photosMap');
        return Object.keys(this.props.liveJourneyMeta).sort((a, b) => this.props.liveJourneyMeta[a].timeStamp - this.props.liveJourneyMeta[b].timeStamp).map((key, index) => {
            console.log(key, index);
            return
        });
    };

    toggle = () => {
        this.setState({
            ...this.state,
            visible: !this.state.visible
        })
    };

    handleHover = (active) => {
        console.log(active);
        this.setState({
            ...this.state,
            isHover: active
        });
    };

    handleChange = (event,) => {
        let str = event.target.value;
        if (str.startsWith('/')) {
            console.log('is a comman d')
            this.setState({
                ...this.state,
                commandsVisible: true
            })
        } else {
            console.log('is not a command');
            this.setState({
                ...this.state,
                commandsVisible: false
            })
        }
    };


    render() {
        return (
            <div className={"container"}>
                <Motion style={{x: spring(this.state.visible ? 30 : 0)}}>
                    {({x}) =>

                        <div className="sidebar-container" style={{
                            WebkitTransform: `translate3d(${x}vw, 0, 0)`,
                            transform: `translate3d(${x}vw, 0, 0)`,
                        }}>
                            <Sidebar></Sidebar>
                        </div>
                    }
                </Motion>

                <div className={'chat'}>

                    <Transition
                        unmountOnExit={true}
                        in={this.state.commandsVisible}
                        out={!this.state.commandsVisible}
                        timeout={200}>
                        {(state) => (
                            <span className={`chat-commands-${state} chat-commands`}>
                                Share </span>)}
                    </Transition>
                    <Transition
                        unmountOnExit={true}
                        in={this.state.commandsVisible}
                        out={!this.state.commandsVisible}
                        timeout={200}>
                        {(state) => (
                            <span className={`chat-commands-${state} chat-commands`}>
                                Donate </span>)}
                    </Transition>

                    <div className={'chat-input'}>


                        <input type="text"
                               style={{width: '100%'}}
                               placeholder="Enter a comment or /'command'"
                               autComplete="off"
                               onChange={(e) => this.handleChange(e)}/>
                    </div>
                </div>

                <div className={'logo'} onClick={()=>this.toggle()}>
                    <img className={'logo-image'} src={"https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/The_North_Face_logo.svg/1200px-The_North_Face_logo.svg.png"}/>
                </div>

                <div className={'menu'}>
                    <Icon className="conditional-display" viewBox="0 0 40 40" size={20} style={{color: 'white'}}>
                        <g>
                            <path
                                d="m20 18.6c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m-10 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z m20 1.1c-0.8 0-1.4 0.6-1.4 1.4s0.6 1.4 1.4 1.4 1.4-0.6 1.4-1.4-0.6-1.4-1.4-1.4z m0-1.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
                        </g>

                    </Icon>
                </div>


                <div className={"journey-container"}>
                    {this.props.liveJourneyMeta !== null ?

                        <img
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                filter: this.state.visible ? 'blur(2px)' : 'none'
                            }}
                            src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/>
                        : null}

                    <Motion style={{x: spring(this.state.isHover ? 3 : 1), y: spring(this.state.isHover ? 0.5 : 1)}}>
                        {({x, y}) =>
                            <div className={'map-container'}
                                 onMouseOver={() => this.handleHover(true)}
                                 onMouseOut={() => this.handleHover(false)}

                                 style={{
                                     width: `${105 * x}px`,
                                     height: `${105 * x}px`,
                                     borderRadius: `${106 * y}px`,
                                     right: '20px'
                                 }}
                            >

                                <Map isMarkerShown={true}
                                     googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIpabTnIbXsdIgI2Zo2zO6g3GGxUbYqw8&v=3.exp&libraries=geometry,drawing,places"
                                     loadingElement={<div style={{height: `100px`,}}/>}
                                     containerElement={<div style={{
                                         height: `${100 * x}px`,
                                         width: `${100 * x}px`,
                                         borderRadius: `${100 * y}px`,
                                         overflow: 'hidden',
                                         zIndex: 3
                                     }}/>}
                                     mapElement={<div style={{height: `100%`}}/>}/>

                            </div>
                        }
                    </Motion>
                </div>

                <div className={'blur-background blur'}>
                    {this.props.liveJourneyMeta !== null ?
                        <img
                            style={{maxWidth: '100%'}}
                            src={'https://www.google.com/maps/about/images/behind-the-scenes/treks/everest-header-bg_2x.jpg'}/> : null}
                </div>
                <div className={'blur-background-overlay'}>

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