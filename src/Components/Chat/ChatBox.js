import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Message from './Message';
import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    ...state,

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

    render() {
        return (
            <div className={'chat-box'}>
                <Message side={'left'} message={'Do you own a cat dog?'} timestamp={1523214420} owner={'Tracy Chapman'}/>
                <Message side={'right'} message={'No!?'} timestamp={1523004420} owner={'JingoJunior'}/>

            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatBox));