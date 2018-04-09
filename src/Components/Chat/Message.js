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
        this.state = {
            mounted: false
        }
    }


    render() {
        return (

            <div className={`message ${this.props.side} box`}>
                <span className={'message-owner'}>{this.props.owner} </span>   <span className={'message-message'}>{this.props.message}</span>

                <div className={'message-meta'}>
                    {moment.unix(this.props.timestamp / 1000).format('YYYY-MM-DD, h:mm:ss a').toUpperCase()}
                </div>
            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));