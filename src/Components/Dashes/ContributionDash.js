import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import medkit from '../Assets/first-aid-kit.svg'


import TransactionCard from '../Cards/Billing/TransactionCard.js';
import MapContainer from '../Map/MapContainer';

import StripeCard from '../Cards/Billing/StripeCard';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onTabClick: (tab) => dispatch({type: 'CHANGE_TAB', tab})
});


class ContributionDash extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={'contribution-container'}>

                <div className={'card'}>
                    <div className={'awesome-logo'}>
                        <img src={medkit}/>

                    </div>


                    <h1>Awesome! A Contributor!</h1>
                    <div>
                        Contributions are displayed and shown throughout the Journey!
                        <br/>
                        This is a fun way to interact with others while they're currently on their experience.
                        <br/>
                        <br/><br/>
                    </div>
                </div>
                <div className={'card'}>
                    <div>
                        <h2>Last Known Location</h2>
                        Time: {Date.now()}
                        <br/>
                        <br/>
                    </div>
                    <div className={'map-container'}>

                        <MapContainer
                            coordinates={{lat: 28.003514, lng: 86.852070}}
                            overlayIcon={medkit}
                        />
                    </div>


                </div>
                <div className={'card'}>

                    <h2>Select from one of the current needs below</h2>
                    <div className={'contribution-button'}>
                        Rations Small: $5

                        <div className={'description'}>
                            We're currently eating beans and canned food for our mainstay.<br/>
                            An event will be triggered when we use this.
                        </div>
                    </div>
                    <div className={'contribution-button'}>
                        Rations Medium: $10
                        <div className={'description'}>
                            We're currently eating beans and canned food for our mainstay.<br/>
                            An event will be triggered when we use this.
                        </div>
                    </div>
                    <div className={'contribution-button'}>
                        Rations Large: $15
                        <div className={'description'}>
                            We're currently eating beans and canned food for our mainstay.<br/>
                            An event will be triggered when we use this.
                        </div>
                    </div>
                    <div className={'contribution-button'}>
                        Pickaxe: $50
                        <div className={'description'}>
                            Pickaxes are great.
                        </div>
                    </div>

                </div>
                <div className={'card'}>

                    <StripeCard></StripeCard>
                </div>
            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContributionDash));
