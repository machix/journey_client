import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-icon-base';

import agent from '../../../Helpers/agent';

const mapStateToProps = (state, ownProps) => ({
    campaignMeta: ownProps.campaignMeta,
    campaignSearchValue: state.common.campaignSearchValue.campaign,
    campaign: ownProps.campaign
});

const mapDispatchToProps = dispatch => ({
    elasticRequest: (searchPhrase, campaign) => dispatch(agent.FirebaseQuery.requestData(searchPhrase, campaign)),
    campaignSearchValueUpdate: (value, campaign) => dispatch({
        type: 'CAMPAIGN_SEARCH_VALUE',
        value: value,
        campaign: campaign
    })
});


class AuthSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchVisible: false,
            toggled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.campaignMeta !== this.props.campaignMeta) {
            this.setState({
                search: '',
                searchVisible: false,
                toggled: false
            })
        }
    }


    changeHandler = (e) => {
        e.preventDefault();
        this.props.elasticRequest(e.target.value, this.props.campaign);
        this.props.campaignSearchValueUpdate(e.target.value, this.props.campaign);
    }

    setSearchVisible = () => {
        this.setState({
            search: '',
            searchVisible: true,
            toggled: true
        })
    }

    setSearchInvisible = () => {
        this.setState({
            search: '',
            searchVisible: false,
            toggled: false
        })
    }


    render() {
        return (
            <div onBlur={this.setSearchInvisible}>
                {this.props.campaignMeta ? (

                    /*If default_email_gift === '' empty, then show the searchBar*/
                    this.props.campaignMeta.default_email_gift === '' || this.state.searchVisible ?
                        <div className="search-box">
                        <Icon className="conditional-display" viewBox="0 0 40 40" size={20} style={{marginBottom: '2px'}}>
                            <g>
                                <path
                                    d="m15.9 23.4c4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5-7.5 3.3-7.5 7.5 3.3 7.5 7.5 7.5z m10 0l8.2 8.2-2.5 2.5-8.2-8.2v-1.4l-0.5-0.4c-1.9 1.6-4.4 2.5-7 2.5-6.1 0-10.9-4.7-10.9-10.7s4.8-10.9 10.9-10.9 10.7 4.8 10.7 10.9c0 2.6-0.9 5.1-2.5 7l0.4 0.5h1.4z"/>
                            </g>
                        </Icon>
                        <span className="conditional-display">&emsp;</span>
                        <input type="text" name="campaignName" id="campaignName"
                               autoFocus = {this.state.toggled === true}
                               placeholder="Search for Giftys here!"
                               autoComplete="off"
                               onChange={this.changeHandler}
                               value={this.props.campaignSearchValue}
                               maxLength="50"
                        />
                        </div>

                        :

                        /*Otherwise show the default e-mail Gift*/
                        <div
                            className="pointer search-box"
                            onClick={() => this.setSearchVisible()}>
                            <span className="conditional-display" style={{float: 'left'}}>Default Gifty: &emsp;</span>
                            <span style={{float: 'right', textOverflow: 'ellipsis'
}}>{this.props.campaignMeta.default_email_gift ? this.props.campaignMeta.default_email_gift : 'None Selected'}</span>
                        </div>

                ) : null
                }
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthSearch);
