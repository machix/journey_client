import React, { Component } from 'react';
import { connect } from 'react-redux';

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


class DefaultValue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            inputVisible: false,
            toggled: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.campaignMeta !== this.props.campaignMeta) {
            this.setState({
                search: '',
                inputVisible: false
            })
        }
    }


    changeHandler = (e) => {
        e.preventDefault();
        this.props.elasticRequest(e.target.value, this.props.campaign);
        this.props.campaignSearchValueUpdate(e.target.value, this.props.campaign);
    }

    setInputVisible = () => {
        this.setState({
            search: '',
            inputVisible: true,
            toggled: true
        })
    }

    setInputInvisible = () => {
        this.setState({
            search: '',
            inputVisible: false,
            toggled: false
        })
    }


    render() {
        return (
            <div onBlur={this.setInputInvisible}>
                {this.props.campaignMeta ? (

                    /*If default_email_gift === '' empty, then show the searchBar*/
                    this.props.campaignMeta.default_phone_value === '' || this.state.inputVisible ?

                        <div className="search-box">
                        $ &emsp;
                            <input
                            type="number"
                            name="defaultValue"
                            id="defaultValue"
                            autoFocus={this.state.toggled === true}
                            placeholder="0.00"/>
                        </div>

                        :

                        /*Otherwise show the default e-mail Gift*/
                        <div
                            className="pointer search-box"
                            onClick={() => this.setInputVisible()}>
                            <span style={{float: 'left'}}>Authorized: &emsp;</span>
                            <span style={{float: 'right'}}>$ {this.props.campaignMeta.default_phone_value}</span>
                        </div>

                ) : null
                }
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DefaultValue);
