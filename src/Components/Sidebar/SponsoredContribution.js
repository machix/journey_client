import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';

const mapStateToProps = state => ({
    ...state,
    sidebarExpanded: state.common.sidebarExpanded,

});

const mapDispatchToProps = dispatch => ({
    setSidebarExpanded: (value) => dispatch({
        type: 'SET_SIDEBAR_EXPANDED',
        value: value
    }),

});


class SponsoredContribution extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={'sponsored-contribution'}>
                <div className={'image'}
                     style={{
                         backgroundImage: `url(${this.props.imageUrl})`,
                     }}>
                </div>
                <div className={'description'}>
                    {this.props.name}<br/>
                    {this.props.description}
                </div>

                {this.props.type === "money" ?
                    <div className={"money"}>
                        ${this.props.amount}
                    </div>
                    : null}

            </div>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SponsoredContribution));