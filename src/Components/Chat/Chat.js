import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';
import Icon from 'react-icon-base';

import * as animationData from '../Assets/heart.json';

import LottieAnimation from '../../Helpers/LottieAnimation';
import ChatBox from './ChatBox';
import agent from '../../Helpers/agent';
import TextAwareCommand from './TextAwareCommand';

const mapStateToProps = state => ({
    ...state,
    chatExpanded: state.common.chatExpanded,
    boxes: state.common.boxes,

    activeCommands: state.choreographer.activeCommands,

});

const mapDispatchToProps = dispatch => ({

    setChatExpanded: (value) => dispatch({
        type: 'SET_CHAT_EXPANDED',
        value: value
    }),
    setBoxExpanded: (value) => dispatch({
        type: 'SET_BOX_EXPANDED',
        value: value
    })
});


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            chatInput: '',
            commandsVisible: false,
            inputVisible: true,
            chatExpanded: false,
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
            case 'chatbox': {
                this.props.setChatExpanded(!this.props.chatExpanded);
                // if(this.props.boxes.length === 1) {
                //     this.props.setBoxExpanded([]);
                // } else {
                //     this.props.setBoxExpanded(['mary'])
                // }

            }
        }
    };

    handleChange = (event,) => {

        let str = event.target.value;
        if (str.startsWith('/')) {
            this.setState({
                ...this.state,
                commandsVisible: true,
                chatInput: event.target.value,
                inputVisible: true
            })
        } else {
            this.setState({
                ...this.state,
                commandsVisible: false,
                chatInput: event.target.value,
                inputVisible: true


            })
        }
    };

    handleKeyPress(target) {
        if (target.charCode == 13 && !this.state.chatInput.startsWith('/') && this.state.chatInput !== '') {
            agent.FirebaseQuery.sendChat('test_journey', this.state.chatInput, 'anonymous_hardcode');
            this.setState({
                ...this.state,
                commandsVisible: false,
                inputVisible: false

            })
        } else if (target.charCode == 13 && this.state.chatInput.startsWith('/') && this.props.activeCommands.length === 1) {
            console.log('Command is: ' + this.props.activeCommands[0]);
            this.setState({
                ...this.state,
                commandsVisible: false,
                inputVisible: false

            })
        }
    }

    render() {
        return (
            <div className={'chat'}>

                <Transition
                    unmountOnExit={true}
                    in={this.state.commandsVisible}
                    out={!this.state.commandsVisible}
                    timeout={200}>
                    {(state) => (
                        <div className={`chat-commands-${state}`}>

                            <TextAwareCommand command={'Share'}
                                              input={this.state.chatInput.substring(1, this.state.chatInput.length)}/>

                            <TextAwareCommand command={'Contribute'}
                                              input={this.state.chatInput.substring(1, this.state.chatInput.length)}/>


                            <TextAwareCommand command={'Pin'}
                                              input={this.state.chatInput.substring(1, this.state.chatInput.length)}/>

                            <TextAwareCommand command={'Expand_Chat'}
                                              input={this.state.chatInput.substring(1, this.state.chatInput.length)}/>

                        </div>





                    )}
                </Transition>

                <ChatBox/>

                <div className={'chat-input'}>
                    <Transition
                        unmountOnExit={false}
                        in={this.state.inputVisible}
                        onExited={() => this.setState({...this.state, chatInput: ''})}

                        timeout={200}>
                        {(state) => (
                            <input
                                className={`chat-input-box-${state}`}
                                type="text"
                                style={{width: '100%'}}
                                placeholder="Enter a comment or /'command'"
                                autoComplete="off"
                                value={this.state.chatInput}
                                onChange={(e) => this.handleChange(e)}
                                onKeyPress={(e) => this.handleKeyPress(e)}/>
                        )}
                    </Transition>
                    <span className="pointer" onClick={() => this.toggle('chatbox')}>
                        {this.props.chatExpanded ? <Icon viewBox="0 0 40 40" size={28} color={'white'}>
                            <g>
                                <path
                                    d="m20 7.5c8.3 0 15 5.4 15 12s-6.6 11.8-14.9 11.8c-2.1 0-4.1-0.3-5.9-0.9h-0.1c-0.3-0.1-0.5-0.2-0.8-0.2s-0.7 0.1-1 0.2c0 0-0.7 0.3-0.7 0.3l-3.9 1.7-0.2 0.1h-0.5c-0.4-0.1-0.6-0.5-0.5-0.8s1.3-4.4 1.3-4.5c0-0.3-0.1-0.6-0.2-0.9l-0.3-0.2c-1.4-1.9-2.3-4.1-2.3-6.6 0-6.6 6.7-12 15-12z"/>
                            </g>
                        </Icon> : <Icon viewBox="0 0 40 40" size={28} color={'white'}>
                            <g>
                                <path
                                    d="m20 8.8c-7.6 0-13.7 4.8-13.7 10.7 0 2.1 0.7 4 2.1 5.7 0 0.1 0 0.2 0 0.3s0.2 0 0.2 0.1c0.3 0.5 0.5 1 0.5 1.6 0 0.2 0 0.2-1.1 3.7l3.1-1.4c0.1 0 0.8-0.3 0.9-0.3h0c0.4-0.1 0.8-0.2 1.3-0.2 0.4 0 0.7 0.1 1.1 0.1l0.1 0.1h0.1c1.5 0.5 3.2 0.8 5.5 0.8 3.7 0 7.2-1.2 9.7-3.1 2.5-2 3.9-4.6 3.9-7.4 0-5.9-6.1-10.8-13.7-10.8z m0-1.3c8.3 0 15 5.4 15 12s-6.6 11.8-14.9 11.8c-2.1 0-4.1-0.3-5.9-0.9h-0.1c-0.3-0.1-0.5-0.2-0.8-0.2s-0.7 0.1-1 0.2c0 0-0.7 0.3-0.7 0.3l-3.9 1.7-0.2 0.1h-0.5c-0.4-0.1-0.6-0.5-0.5-0.8s1.3-4.4 1.3-4.5c0-0.3-0.1-0.6-0.2-0.9l-0.3-0.2c-1.4-1.9-2.3-4.1-2.3-6.6 0-6.6 6.7-12 15-12z"/>
                            </g>
                        </Icon>}

                    </span>
                    <span className="pointer" onClick={() => this.toggle('liked')}>
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