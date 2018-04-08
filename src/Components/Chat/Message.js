import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

const mapStateToProps = state => ({
    ...state,

});

const mapDispatchToProps = dispatch => ({});


class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <div className={`message ${this.props.side} box`}>
                <div className={'message-meta'}>
                    {this.props.owner}<br/>
                    {moment.unix(this.props.timestamp).format('YYYY-MM-DD, h:mm:ss a').toUpperCase()}
                </div>
                {this.props.message}
            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));