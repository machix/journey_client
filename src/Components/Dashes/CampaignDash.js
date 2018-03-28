import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Select from 'react-select';


import CampaignStats from '../Cards/Campaign/CampaignStats';
import ShortSummary from '../Cards/ShortSummary.js';
import PageFade from '../../Helpers/PageFade.js'
import LoadScreen from '../../Helpers/LoadScreen';
import HOC from '../../Helpers/HOC';
import agent from '../../Helpers/agent';
import PublicCampaignStats from '../Cards/Campaign/PublicCampaignStats';
import Form from '../Form/index.js';

const mapStateToProps = state => ({
    ...state,
    consoleData: state.common.consoleData,
    redirectTo: state.common.redirectTo,
    console_id: state.common.consoleData.console_id,
    loaderDisplay: state.common.loaderDisplay
});

const mapDispatchToProps = dispatch => ({
    createCampaign: (key, dashboard, bundle) => agent.FirebaseQuery.consoleEndpoint(key, 'create_campaign', dashboard, '/links', bundle)
});

const options = [
    {value: 'email', label: 'E-mail'},
    {value: 'phone', label: 'Phone'}
];


class CampaignDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        }
    }

    selectHandler(val) {
        this.setState({
            ...this.state,
            selected: val.value
        });
    }

    changeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    createCampaign(key, console_id, name, type) {
        console.log(name);
        if (name === '' || typeof(name) === 'undefined') {
            // toast.error("Please enter a campaign name!", {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // });
        } else if (type === null) {
            // toast.error("Please select a campaign type!", {
            //     position: toast.POSITION.BOTTOM_RIGHT
            // });
        } else {
            this.props.createCampaign(key, console_id, {name: name, type: type});
            this.setState({
                name: '',
                selected: null
            })
        }
    }

    campaignsMap = () => {
        return Object.keys(this.props.consoleData.campaigns).map(function (key, index) {
            return (
                <CampaignStats key={key} campaign={key}></CampaignStats>
            )
        }, this);
    };


    render() {
        return (
            <HOC>
                <PageFade>
                    {this.props.loaderDisplay === true && this.props.consoleData.campaigns ? <LoadScreen/> :
                        <div className="main-container">
                            <div className="main">
                                <div className="content">

                                    <section className="analytics">
                                        <div className="list-header">
                                            <div className="header-copy-campaign">
                                                <h4 className="header-title">Making New Campaign?</h4>
                                            </div>
                                            <input type="text" name="campaignName" id="campaignName"
                                                   placeholder="Start by Entering a Campaign Name!"
                                                   value={this.state.name}
                                                   onChange={this.changeHandler}
                                                   autoComplete="off"
                                                   className="no-border"
                                                   maxLength="50"
                                            />
                                            <div className="header-actions">
                                                <div style={{display: 'inline-flex', width: '115px'}}>
                                                    <Select
                                                        className="campaign-select"
                                                        value={this.state.selected}
                                                        clearable={false}
                                                        searchable={false}
                                                        placeholder="Type"
                                                        options={options}
                                                        onChange={(val) => this.selectHandler(val)}/>
                                                </div>

                                                <div
                                                    onClick={() => this.createCampaign(null, this.props.console_id, this.state.name, this.state.selected)}
                                                    className="button button-small button-blue">Create
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {this.props.consoleData.campaigns ? this.campaignsMap() : null}
                                    <PublicCampaignStats></PublicCampaignStats>
                                    <ShortSummary></ShortSummary>
                                </div>
                            </div>
                        </div>
                    }
                </PageFade>
            </HOC>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampaignDash));

/*    <ul className="tabs">
 <li className="tab">
 <a href="#something" className="is-selected">Summary</a>
 </li>
 <li className="tab">
 <a href="#something" className="">Sender Segments</a>
 </li>
 <li className="tab">
 <a href="#something" className="separator">Settings</a>
 </li>
 </ul>*/

/*() => this.createCampaign(null, this.props.console_id, this.state.name)*/