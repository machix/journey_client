import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import Transition from 'react-transition-group/Transition';


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

    componentDidMount() {
        this.setState({
            ...this.state,
            mounted: true
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message !== this.props.message) {
            this.setState({
                mounted: true
            })
        }
    }

    unmount = () => {
        console.log('please unmount');
        this.setState({
            ...this.state,
            mounted: false
        })
    }

    render() {
        return (
            <Transition
                unmountOnExit={true}
                in={this.state.mounted}
                out={this.state.mounted}
                onEntered={() => this.unmount()}
                timeout={{enter: 1500, exit: 200}}>
                {(state) => (
                    <div className={`message message-${state} ${this.props.side} box`}>
                        <div className={'message-meta'}>
                            {this.props.owner}<br/>
                            {moment.unix(this.props.timestamp).format('YYYY-MM-DD, h:mm:ss a').toUpperCase()}
                        </div>
                        {this.props.message}
                    </div>)}
            </Transition>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));