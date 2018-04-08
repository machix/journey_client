import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    ...state,

});

const mapDispatchToProps = dispatch => ({});


class TextAwareCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
    }

    componentWillReceiveProps(nextProps) {

    }

    initial = () => {
        let reg = new RegExp(this.props.input, "ig");

        return this.props.command.match(reg);
    }

    remaining = () => {
        let reg = new RegExp(this.props.input, "ig");

        console.log(this.props.command.replace(this.props.input, ""))
        return this.props.command.replace(reg, "");
    }

    render() {
        return (<span>
       <span className={'command-match'}>
           {this.initial()}
       </span>
                {this.remaining()}
            </span>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextAwareCommand));