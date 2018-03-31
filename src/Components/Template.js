import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({

});


class Sidebar extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
            >
                {this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
            </GoogleMap>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));