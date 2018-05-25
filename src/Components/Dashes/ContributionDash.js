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

const ContributionButton = props => {

    return (
        <div className={'contribution-button'}
             onClick={props.onClick}
             style={{backgroundColor: props.selected === props.match ? props.selectedColor : null}}>
            {props.title}
            <div className={'description'}>
                {props.description}
            </div>
        </div>
    );
}

const TransactionInfoTab = props => {
    const clickHandler = ev => {
        ev.preventDefault();
        props.onTabClick('transactions');
    };
    return (
        <li className="tab nav-item">
            <a
                href=""
                className={props.tab === 'transactions' ? 'nav-link is-selected' : 'nav-link'}
                onClick={clickHandler}>
                Transaction Information
            </a>
        </li>
    );
};


class ContributionDash extends Component {

    constructor(props) {

        super(props);

        this.state = {
            selected: 1
        }
    }

    selected = (number) => {
        console.log(number);
        switch (number) {
            case 5:
                this.setState({
                    ...this.state,
                    selected: 5
                });
                break;
            case 10:
                this.setState({
                    ...this.state,
                    selected: 10
                });
                break;
            case 15:
                this.setState({
                    ...this.state,
                    selected: 15
                });
                break;
            case 50:
                this.setState({
                    ...this.state,
                    selected: 50
                });
                break;
        }
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
                    <ContributionButton title={'  Rations Small: $5'}
                                        description={"We're currently eating beans and canned food for our mainstay. \n \n" +
                                        "An event will be triggered when we use this."}
                                        selected={this.state.selected}
                                        match={5}
                                        selectedColor={'#c693f0'}
                                        onClick={() => this.selected(5)}/>

                    <ContributionButton title={'  Rations Medium: $10'}
                                        description={"We're currently eating beans and canned food for our mainstay. \n \n" +
                                        "An event will be triggered when we use this."}
                                        selected={this.state.selected}
                                        match={10}
                                        selectedColor={'#899cf0'}
                                        onClick={() => this.selected(10)}/>

                    <ContributionButton title={'  Rations Small: $15'}
                                        description={"We're currently eating beans and canned food for our mainstay. \n \n" +
                                        "An event will be triggered when we use this."}
                                        selected={this.state.selected}
                                        match={15}
                                        selectedColor={'#f08159'}
                                        onClick={() => this.selected(15)}/>
                    <ContributionButton title={'                        Pickaxe: $50\n'}
                                        description={'Pickaxes are great.'}
                                        selected={this.state.selected}
                                        match={50}
                                        selectedColor={'#3ac732'}
                                        onClick={() => this.selected(50)}/>

                </div>
                <div className={'card'}>

                    <StripeCard></StripeCard>
                </div>
            </div>


        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ContributionDash));
