import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';

import update from 'immutability-helper';

const mapStateToProps = state => ({
    ...state,
    activeCommands: state.choreographer.activeCommands
});

const mapDispatchToProps = dispatch => ({
    updateCommands: (value) => dispatch({
        type: 'UPDATE_COMMANDS',
        value: value
    })
});


class TextAwareCommand extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mounted: true
        }
    }

    componentWillReceiveProps(nextProps) {

        //This is a very hacky implementation...
        let reg = new RegExp(`^${nextProps.input}`, "i");

        if(nextProps.input === this.props.input) {
            //ignore
        } else {
            if (nextProps.input.length > 0 && this.props.command.match(reg) === null) {
                let index = nextProps.activeCommands.indexOf(this.props.command);
                if(index === -1) {

                } else {
                    let array = update(nextProps.activeCommands, {$splice: [[index, 1]]})
                    this.props.updateCommands(array)
                }
                this.setState({mounted: false});
            } else {
                let index = nextProps.activeCommands.indexOf(this.props.command);

                if(index === -1) {
                    let array = update(nextProps.activeCommands, {$push: [this.props.command]})
                    this.props.updateCommands(array);
                }
                this.setState({mounted: true});
            }
        }


    }

    initial = () => {
        let reg = new RegExp(`^${this.props.input}`, "i");
        return this.props.command.match(reg);
    }

    remaining = () => {
        let reg = new RegExp(`^${this.props.input}`, "i");
        return this.props.command.replace(reg, "");
    }

    renderIcons = () => {
        switch (this.props.command) {
            case 'Share':
                return <span>
                        <Icon viewBox="0 0 40 40" size={20}>
            <g><path
                d="m30 26.9c2.7 0 4.8 2.2 4.8 4.8s-2.1 4.9-4.8 4.9-4.8-2.2-4.8-4.9c0-0.4 0-0.8 0.1-1.1l-11.9-6.8c-0.9 0.8-2.1 1.3-3.4 1.3-2.7 0-5-2.3-5-5s2.2-5 4.9-5c1.3 0 2.5 0.4 3.5 1.3l11.8-6.8c-0.1-0.4-0.2-0.8-0.2-1.2 0-2.7 2.3-5 5-5s5 2.3 5 5-2.3 5-5 5c-1.3 0-2.5-0.4-3.4-1.3l-11.8 6.8c0 0.4 0.1 0.8 0.1 1.2s-0.1 0.8-0.1 1.1l11.9 6.9c0.9-0.8 2-1.2 3.3-1.2z"/></g>

    </Icon>&emsp;
           </span>

            case 'Pin':
                return <span>
                        <Icon viewBox="0 0 40 40" size={20}>
        <g>
            <path
                d="m25.7 17.8c1.6 0.8 2.8 2.4 2.8 4.3 0 1.3-0.2 1.7-1.2 1.7h-6.3l-0.9 13.7h-0.7l-0.9-13.7h-6.3c-1 0-1.2-0.4-1.2-1.7 0-1.9 1.3-3.5 2.8-4.3 0.1 0 0.2-0.1 0.3-0.1 0.6-0.4 1-0.9 1.1-1.5l1.4-9.2v-0.4c0-0.6-0.3-0.8-0.8-1.1 0 0 0 0-0.1 0-0.6-0.3-1-0.7-1-1.4 0-1.5 0.5-1.6 1.5-1.6h7.1c1 0 1.5 0.1 1.5 1.6 0 0.7-0.4 1.1-1 1.4-0.1 0-0.1 0-0.1 0-0.5 0.3-0.8 0.5-0.8 1.1v0.4l1.4 9.2c0.1 0.6 0.5 1.1 1.1 1.5 0.1 0 0.2 0.1 0.3 0.1z"/>
        </g>
    </Icon>&emsp;
           </span>

        }
    }

    render() {
        return (
            <span> {this.state.mounted === true ?
                <span className={'chat-commands'}>

                    {this.renderIcons()}

                    <span>
       <span className={'command-match'}>
           {this.initial()}
       </span>
                        {this.remaining()}
            </span>

            </span> : null}
            </span>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TextAwareCommand));