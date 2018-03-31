import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({});


class Sidebar extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

            </div>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));