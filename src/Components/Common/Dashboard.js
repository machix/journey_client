import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import SidebarData from './SidebarData';
import { withRouter } from 'react-router-dom';

import Sidebar from 'react-sidebar';

import agent from '../../Helpers/agent';

const mql = window.matchMedia(`(min-width: 800px)`);

const mapStateToProps = state => ({
    ...state,
    redirectTo: state.common.redirectTo,
    uid: state.auth.uid,
    sidebarOpen: state.common.sidebarOpen,
    modal_toggle: state.common.modal_toggle.value
});

const mapDispatchToProps = dispatch => ({
    watchDatabase: () => dispatch(agent.FirebaseWatcher.links()),
    lookupConsole2: (uid) => dispatch(agent.Auth.lookupConsole2(uid)),
    desktop: (value) => dispatch({
        type: 'DESKTOP',
        value: value
    }),
    menuToggle: (value) => dispatch({
        type: 'SIDEBAR_OPEN',
        value: value
    }),


});


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mql: mql,
            docked: props.docked,
            open: props.open
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
        this.props.menuToggle(open);
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
        this.props.desktop(mql.matches);

//         agent.Auth.current().then((user) => {
// /*
//             this.props.lookupConsole2(user.uid);
// */
//
//         })
//         /*.then((snapshot) => {
//          console.log(snapshot.val());
//          this.props.fetchConsole(snapshot.val());
//          })*/.catch((error) => {
//         });
        this.props.watchDatabase();
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged() {
        this.setState({sidebarDocked: this.state.mql.matches});
        this.props.desktop(mql.matches);
    }

/*
    componentWillReceiveProps(nextProps) {
        console.log('dashboard');
        console.log(nextProps.sidebarOpen)
    }
*/


    render() {
        var sidebarContent = <SidebarData></SidebarData>;


        return (
            <div className={this.props.modal_toggle === 'open' ? "root blur" : "root"}>
                <Sidebar sidebar={sidebarContent}
                         open={this.props.sidebarOpen}
                         docked={this.props.desktop ? this.state.sidebarDocked : false}
                         onSetOpen={this.onSetSidebarOpen}
                         shadow={false}
                         contentClassName={'content-container'}
                         touch={true}
                         touchHandleWidth= {50}
                         dragToggleDistance={10}
                         styles={{
                         content: {

                         },
                         overlay: {
                         zIndex: 2
                         },
                         sidebar: {
                         zIndex: 10}}}>
                    <div className="container">
                        {this.props.children}
                    </div>
                </Sidebar>
            </div>

        );
    }
}

//                <Header></Header>



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
