import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import InstantMessage from './InstantMessage';
import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    ...state,
    message: state.choreographer.message

});

const mapDispatchToProps = dispatch => ({
    chatListener: (journey_uid)=>dispatch(agent.FirebaseQuery.chatListener(journey_uid))
});


class ChatBox extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        this.props.chatListener('test_journey');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message !== this.props.message) {
            console.log('render a new message');
        }
    }

    render() {
        return (
            <div className={'chat-box'}>
                {
                    this.props.message !== null ?
                        <InstantMessage side={'right'} message={this.props.message.message} timestamp={this.props.message.timestamp} owner={this.props.message.name}/>
                        : null
                }

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBox));