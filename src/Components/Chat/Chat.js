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
    activeCommands: state.choreographer.activeCommands

});

const mapDispatchToProps = dispatch => ({});


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            chatInput: '',
            commandsVisible: false,
            inputVisible: true,
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
        if (target.charCode == 13 && !this.state.chatInput.startsWith('/')) {
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

                                <TextAwareCommand command={'Share'} input={this.state.chatInput.substring(1,this.state.chatInput.length)}/>

                                <TextAwareCommand command={'Contribute'} input={this.state.chatInput.substring(1,this.state.chatInput.length)}/>



                                <TextAwareCommand command={'Pin'} input={this.state.chatInput.substring(1,this.state.chatInput.length)}/>

                               <TextAwareCommand command={'Expand_Chat'} input={this.state.chatInput.substring(1,this.state.chatInput.length)}/>

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