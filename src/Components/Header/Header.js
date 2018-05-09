import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';

import history from '../../Helpers/history.js';

import store from '../../store.js';

import DropDown from '../DropDown/DropDown';

import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    dateSelection: (selection, startDate, endDate) => dispatch({
        type: 'DATE_FILTER',
        filter: selection,
        startDate: startDate,
        endDate: endDate
    }),
    updateChart: (agreement, filter, startDate, endDate) => dispatch(agent.FirebaseQuery.updateChartData(agreement, filter, startDate, endDate)),
    menuToggle: (value) => dispatch({
        type: 'SIDEBAR_OPEN',
        value: value
    })
});


class Header extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        this.state = {
            isDropDownOpen: false
        }
    }

    toggleDropDown() {
        console.log('this is clicked');

        this.setState({
            ...this.state,
            isDropDownOpen: !this.state.isDropDownOpen
        })

    }

    navigate(location) {
        console.log(this.props.location.pathname);
        if (this.props.location.pathname === location) {
            console.log('not navigating');
        } else {
            history.push(location)
        }
    }

    render() {
        return (
            <div className="header-container">
                <div className={'header'}>
                    <nav className={'no-select'
                    }>
                        <li onClick={() => this.navigate('/')}>Home</li>
                        <li onClick={() => this.navigate('/about')}>About</li>
                    </nav>
                    {this.props.user !== null ?
                        <div className={'profile-information'}
                             tabIndex="1"
                             onBlur={() => this.toggleDropDown()}
                             onClick={() => this.toggleDropDown()}>
                            {this.props.user.displayName}
                            <img className={'profile-photo'} src={this.props.user.photoURL}/>
                            <DropDown
                                isOpen={this.state.isDropDownOpen}

                                align={'right'}
                                listItems={[
                                    {
                                        icon: null,
                                        name: 'Your Profile',
                                        handleClick: () => console.log('nothing yet!')
                                    },
                                    {
                                        icon: null,
                                        name: 'Logout',
                                        handleClick: () => store.dispatch(agent.Auth.logout())
                                    }]}></DropDown>
                        </div> : null}

                </div>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

/*              <div className="header-main-container">
                    <header>
                        <nav>
                            <span>


                                <div className="date-picker">
                                </div>

                                <div>
                                    <div style={{
                                        display: 'inline-block',
                                        paddingRight: '10px'
                                    }}
                                         className="date-filters-group conditional-nodisplay-desktop pointer">
                                        <Icon viewBox="0 0 40 40" style={{paddingBottom: '4px'}} size={25}
                                              onClick={() => this.props.menuToggle(!this.props.sidebarOpen)}>
                                            <g><path
                                                d="m5 10h30v3.4h-30v-3.4z m0 11.6v-3.2h30v3.2h-30z m0 8.4v-3.4h30v3.4h-30z"/></g>
                                        </Icon>

                                    </div>
                                </div>
											</span>
                            <ul className="top-links conditional-display">
                                <li>
                                    <div className="top-link" onClick={() => agent.Auth.logout()}>
                                        <a href="/"
                                           className="top-link-link top-link-link--feedback"></a>
                                        <div className="top-link-tooltip">
                                            <div className="top-link-tooltip-label">Send feedback</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </header>
                </div>*/