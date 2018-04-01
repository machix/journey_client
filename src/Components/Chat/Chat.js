import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import Icon from 'react-icon-base';

import * as animationData from '../Assets/heart.json';


import LottieAnimation from '../../Helpers/LottieAnimation';


const mapStateToProps = state => ({
    ...state,

});

const mapDispatchToProps = dispatch => ({});


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            commandsVisible: false
        }

    }

    toggle = (value) => {

        console.log('toggle: ' + value);
        switch (value) {

            case 'liked': {
                console.log(this.state.liked);
                this.setState({
                    ...this.state,
                    liked: !this.state.liked
                });
                return;
            }

        }

    };

    handleChange = (event,) => {
        let str = event.target.value;
        if (str.startsWith('/')) {
            this.setState({
                ...this.state,
                commandsVisible: true
            })
        } else {
            this.setState({
                ...this.state,
                commandsVisible: false
            })
        }
    };

    render() {
        return (
            <div className={'chat'}>

                <Transition
                    unmountOnExit={true}
                    in={this.state.commandsVisible}
                    out={!this.state.commandsVisible}
                    timeout={200}>
                    {(state) => (
                        <span className={`chat-commands-${state} chat-commands`}>
    <span>
                        <Icon viewBox="0 0 40 40" size={20}>
            <g><path
                d="m30 26.9c2.7 0 4.8 2.2 4.8 4.8s-2.1 4.9-4.8 4.9-4.8-2.2-4.8-4.9c0-0.4 0-0.8 0.1-1.1l-11.9-6.8c-0.9 0.8-2.1 1.3-3.4 1.3-2.7 0-5-2.3-5-5s2.2-5 4.9-5c1.3 0 2.5 0.4 3.5 1.3l11.8-6.8c-0.1-0.4-0.2-0.8-0.2-1.2 0-2.7 2.3-5 5-5s5 2.3 5 5-2.3 5-5 5c-1.3 0-2.5-0.4-3.4-1.3l-11.8 6.8c0 0.4 0.1 0.8 0.1 1.2s-0.1 0.8-0.1 1.1l11.9 6.9c0.9-0.8 2-1.2 3.3-1.2z"/></g>

    </Icon>&emsp;
           </span>

                                Share </span>)}
                </Transition>
                <Transition
                    unmountOnExit={true}
                    in={this.state.commandsVisible}
                    out={!this.state.commandsVisible}
                    timeout={200}>
                    {(state) => (
                        <span className={`chat-commands-${state} chat-commands`}>
                                Contribute </span>)}
                </Transition>
                <Transition
                    unmountOnExit={true}
                    in={this.state.commandsVisible}
                    out={!this.state.commandsVisible}
                    timeout={200}>
                    {(state) => (
                        <span className={`chat-commands-${state} chat-commands`}>
                                  <span>
                        <Icon viewBox="0 0 40 40" size={20}>
        <g>
            <path
                d="m25.7 17.8c1.6 0.8 2.8 2.4 2.8 4.3 0 1.3-0.2 1.7-1.2 1.7h-6.3l-0.9 13.7h-0.7l-0.9-13.7h-6.3c-1 0-1.2-0.4-1.2-1.7 0-1.9 1.3-3.5 2.8-4.3 0.1 0 0.2-0.1 0.3-0.1 0.6-0.4 1-0.9 1.1-1.5l1.4-9.2v-0.4c0-0.6-0.3-0.8-0.8-1.1 0 0 0 0-0.1 0-0.6-0.3-1-0.7-1-1.4 0-1.5 0.5-1.6 1.5-1.6h7.1c1 0 1.5 0.1 1.5 1.6 0 0.7-0.4 1.1-1 1.4-0.1 0-0.1 0-0.1 0-0.5 0.3-0.8 0.5-0.8 1.1v0.4l1.4 9.2c0.1 0.6 0.5 1.1 1.1 1.5 0.1 0 0.2 0.1 0.3 0.1z"/>
        </g>
    </Icon>&emsp;
           </span>
                                Pin
                            </span>)}
                </Transition>

                <Transition
                    unmountOnExit={true}
                    in={this.state.commandsVisible}
                    out={!this.state.commandsVisible}
                    timeout={200}>
                    {(state) => (
                        <span className={`chat-commands-${state} chat-commands`}>
                               Expand_Chat
                            </span>)}
                </Transition>

                <div className={'chat-input'}>
                    <input type="text"
                           style={{width: '100%'}}
                           placeholder="Enter a comment or /'command'"
                           autoComplete="off"
                           onChange={(e) => this.handleChange(e)}/>
                    <span onClick={() => this.toggle('liked')}>
                         <LottieAnimation
                             autoplay={false}
                             animationData={animationData}
                             liked={this.state.liked}>
                            </LottieAnimation>
                    </span>
                </div>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chat));