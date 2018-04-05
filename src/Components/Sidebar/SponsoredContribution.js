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
            <div className={'sponsored-contribution hvr-grow'}>
                <div style={{
                    position: 'absolute', top: 0, left: 5,
                    color: 'white',
                    transform: 'rotate(30deg)'
                }}>
                    <Icon viewBox="0 0 40 40" size={10}>
                        <g>
                            <path
                                d="m25.7 17.8c1.6 0.8 2.8 2.4 2.8 4.3 0 1.3-0.2 1.7-1.2 1.7h-6.3l-0.9 13.7h-0.7l-0.9-13.7h-6.3c-1 0-1.2-0.4-1.2-1.7 0-1.9 1.3-3.5 2.8-4.3 0.1 0 0.2-0.1 0.3-0.1 0.6-0.4 1-0.9 1.1-1.5l1.4-9.2v-0.4c0-0.6-0.3-0.8-0.8-1.1 0 0 0 0-0.1 0-0.6-0.3-1-0.7-1-1.4 0-1.5 0.5-1.6 1.5-1.6h7.1c1 0 1.5 0.1 1.5 1.6 0 0.7-0.4 1.1-1 1.4-0.1 0-0.1 0-0.1 0-0.5 0.3-0.8 0.5-0.8 1.1v0.4l1.4 9.2c0.1 0.6 0.5 1.1 1.1 1.5 0.1 0 0.2 0.1 0.3 0.1z"/>
                        </g>
                    </Icon>
                </div>

                <div className={'image'}
                     style={{
                         backgroundImage: `url(${this.props.imageUrl})`,
                     }}>
                </div>
                <div className={'description'}>
                    <div>
                        <div className={'description-title'}> {this.props.name}</div>
                        <div className={'subText'}> {this.props.description}</div>
                        {this.props.product ?
                            <div className={'url'}><a href={this.props.productUrl}>{this.props.product}</a>
                            </div> : null}

                    </div>
                </div>

                {this.props.type === "money" ?
                    <div className={"money"}>
                        +${this.props.amount}!
                    </div>
                    : null}

            </div>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SponsoredContribution));