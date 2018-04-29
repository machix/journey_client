import React, {Component} from 'react';
import {Motion, spring} from 'react-motion'

import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Icon from 'react-icon-base';

import Message from './Message';

const mapStateToProps = state => ({
    ...state,
    chatExpanded: state.common.chatExpanded,
    mapExpanded: state.common.mapExpanded,

    windowHeight: state.common.windowHeight,
    windowWidth: state.common.windowWidth,

    messages: state.choreographer.messages
});

const mapDispatchToProps = dispatch => ({
    setMapExpanded: (value) => dispatch({
        type: 'SET_MAP_EXPANDED',
        value: value
    }),
    setChatExpanded: (value) => dispatch({
        type: 'SET_CHAT_EXPANDED',
        value: value
    }),

});


class ChatContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chatExpanded: false
        };
    }

    componentDidMount() {
        this.setState({
            chatExpanded: true
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }



    chatMap() {
        return this.props.messages.map((array, index) => {
            return <Message
                key={index}
                side={'right'}
                message={array.message}
                timestamp={array.timestamp}
                owner={array.name}/>
        })
    }


    scrollToBottom() {
        console.log('should scroll');
        this.el.scrollIntoView({behavior: 'smooth'});
    }



    render() {
        return (

            <Motion
                onRest={() => this.scrollToBottom()}
                style={{
                    marginControl: spring(this.state.chatExpanded ? 0 : 1),
                    toggleHeight: spring(this.state.chatExpanded ? 7 : 0),
                    toggleRadius: spring(this.state.chatExpanded ? 0 : 1),
                    mapMultiplier: spring(this.props.mapExpanded ? 0.5 : 0.9)
                    // hoverHeight: spring(this.props.mapIsHover ? 3 : 1),
                    // hoverRadius: spring(this.props.mapIsHover ? 0.5 : 1),
                }}>
                {({mapMultiplier, toggleRadius, toggleHeight, marginControl}) =>


                    <div className={'chat-container'}
                         style={{
                             position: 'absolute',
                             right: `${10 * marginControl}px`,
                             minHeight: '1px',
                             minWidth: '1px',
                             height: `${10 * (toggleHeight) / 100 * this.props.windowHeight * mapMultiplier}px`,
                             width: `${(10 + toggleHeight * 1 * 5) / 100 * this.props.windowHeight}px`,
                             borderRadius: `${9.8 * toggleRadius / 100 * this.props.windowHeight}px`,
                             backgroundColor: 'rgba(0, 0, 0, 0)',
                             zIndex: 3,
                         }}>
                        {this.props.messages.length > 0 ? this.chatMap() : null}
                        <div
                            ref={el => {
                                this.el = el;
                            }}
                        ></div>
                    </div>


                }
            </Motion>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatContainer));


/* {this.props.mapExpanded ? <div
                            onClick={() => this.toggle('closeChat')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                left: -25,
                                backgroundColor: 'white',
                                width: '25px',
                                height: '40px',
                                borderBottomLeftRadius: '5px',
                                borderTopLeftRadius: '5px'
                            }}>
                            <Icon viewBox="0 0 40 40" size={20} style={{color: 'rgba(0, 0, 0, 0.7)'}}>
                                <g>
                                    <path
                                        d="m23.3 20l-13.1-13.6c-0.3-0.3-0.3-0.9 0-1.2l2.4-2.4c0.3-0.3 0.9-0.4 1.2-0.1l16 16.7c0.1 0.1 0.2 0.4 0.2 0.6s-0.1 0.5-0.2 0.6l-16 16.7c-0.3 0.3-0.9 0.3-1.2 0l-2.4-2.5c-0.3-0.3-0.3-0.9 0-1.2z"/>
                                </g>
                            </Icon>
                        </div> : null}*/