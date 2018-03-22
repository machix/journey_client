import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import { withRouter } from 'react-router-dom';
import './fade.css'

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({});

class PageFade extends Component {

    render() {

        return (
            <CSSTransitionGroup
                transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}
            >
                {this.props.children}
            </CSSTransitionGroup>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageFade));