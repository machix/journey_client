import React, { Component } from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';
import { CSSTransitionGroup } from 'react-transition-group';

import agent from '../../Helpers/agent';
import {FaCopy} from 'react-icons/lib/fa/copy'

const mapStateToProps = (state, ownProps) => ({
    links: state.common.links,
    index: ownProps.index,
    name: ownProps.name
});

const mapDispatchToProps = dispatch => ({});


class LinkDisplay extends Component {

    shouldRender = () => {
        if (typeof this.props.links[this.props.name] !== "undefined") {
            return (

                <div >

                    <CopyToClipboard style={{cursor: 'pointer'}} text={this.props.links[this.props.name]}>
                        <FaCopy></FaCopy>
                    </CopyToClipboard>

                    <span className="force_select" id={this.props.name}
                          value={this.props.links[this.props.name]}>{this.props.links[this.props.name]}</span>

                </div>

            )
        } else {
            return null
        }
    }

    render() {
        return (
            <CSSTransitionGroup
                transitionName="test"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}>
                {this.shouldRender()}
            </CSSTransitionGroup>
        )


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkDisplay)
