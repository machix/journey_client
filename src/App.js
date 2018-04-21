/*  --- IMPORT
 ------------------------------------------ */
import React, { Component } from 'react';
// import logo from './logo.svg';
import './style.css';
import Login from './Components/Common/Login.js';
import { connect } from 'react-redux';
import history from './Helpers/history';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    onRedirect: () => {
        dispatch({type: 'REDIRECT'});
    }
});

/*  --- APP
 ------------------------------------------ */
class App extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        this.state = {
            // Data
            loading: false,

            // Auth vars
            auth: {}
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.redirectTo) {
    //         history.push(nextProps.redirectTo);
    //         this.props.onRedirect();
    //     }
    // }


    render() {
        return (
            <Login></Login>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));