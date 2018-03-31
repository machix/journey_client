import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({});


class Chatbox extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={'chat-input'}>

            </div>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chatbox));