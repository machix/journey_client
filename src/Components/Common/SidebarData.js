import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';

import agent from '../../Helpers/agent';

const mapStateToProps = state => ({
    name: state.common.consoleData.name,
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
    menuToggle: () => dispatch({
        type: 'SIDEBAR_OPEN',
        value: false
    })
});


class SidebarData extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: false,

            // Auth vars
            auth: {}
        }
    }


    render() {
        return (
            <div className="sidebar"><span>
				<div className="navigation">
                    <div className="sidebar-wrapper">
						<span>
							<div className="sidebar-nav">
                                <div className="sidebar-nav-content">
                                    <nav>
                                        <ul>
                                                <li><Link className="nav-section-logout" to="/login"
                                                          onClick={() => agent.Auth.logout()}>Logout</Link>
    </li>
</ul>

                                    </nav>
                                </div>
                            </div>
						</span>
                    </div>

                </div>
			</span></div>
        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarData));

/*

		<a className="account-dropdown account-dropdown-arrow">
                    <div className="image">
                        <div className="image-content"></div>
                    </div>

                    <div className="info">
                        <div
                            className="info-nickname">{(this.props.name) ? this.props.name : 'You'}</div>
                    </div>
                </a>

<ul className="sidebar-section" onClick={this.props.menuToggle()}>
    <li><Link className="nav-section-home" to="/home">Pulse</Link></li>
    <li><Link className="nav-section-campaigns" to="/campaigns">Campaigns</Link>
    </li>
    <li><Link className="nav-section-agreements"
              to="/giftys">My Giftys</Link>
    </li>
    <li><Link className="nav-section-manage-giftys" to="/billing">Billing</Link>
    </li>
    <li><Link className="nav-section-logout" to="/login" onClick={()=>agent.Auth.logout()}>Logout</Link>
    </li>
</ul>

<ul className="sidebar-section nodisplay">
    <li><Link className="nav-section-home is-selected"
to="/home">Home</Link>
</li>
<li><a className="nav-section-manage-giftys gosub"
       href="/campaigns">Manage Giftys</a></li>
    <li><Link className="nav-section-agreements"
              to="/notifications">Notifications</Link></li>
    </ul>
    */