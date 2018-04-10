import React, {Component} from 'react';
import agent from '../../Helpers/agent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';

import history from '../../Helpers/history';
import {geoPath, geoMercator} from 'd3-geo';


import FlipCard from 'react-flipcard';


const mapStateToProps = state => ({
    ...state.auth,
    register: state.common.register
});

const mapDispatchToProps = dispatch => ({
    updateFieldAuth: (key, value) =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: key, value}),
    onSubmit: (email, password) => {
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)})
    },
    onRegister: (name, vendor, email, password, checked) => {
        if (checked === true) {
            dispatch({type: 'REGISTER', payload: agent.Auth.register(email, password), name: name, vendor: vendor})
        }
    },
    onUnload: () =>
        dispatch({type: 'LOGIN_PAGE_UNLOADED'})
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            svgHeight: 150,
            geojson: {
                "type": "LineString",
                "coordinates": [
                    [
                        -101.744384765625,
                        39.32155002466662
                    ],
                    [
                        -101.5521240234375,
                        39.330048552942415
                    ],
                    [
                        -101.40380859375,
                        39.330048552942415
                    ],
                    [
                        -101.33239746093749,
                        39.364032338047984
                    ],
                    [
                        -101.041259765625,
                        39.36827914916011
                    ],
                    [
                        -100.975341796875,
                        39.30454987014581
                    ],
                    [
                        -100.9149169921875,
                        39.24501680713314
                    ],
                    [
                        -100.843505859375,
                        39.16414104768742
                    ],
                    [
                        -100.8050537109375,
                        39.104488809440475
                    ],
                    [
                        -100.491943359375,
                        39.10022600175347
                    ],
                    [
                        -100.43701171875,
                        39.095962936305476
                    ],
                    [
                        -100.338134765625,
                        39.095962936305476
                    ],
                    [
                        -100.1953125,
                        39.027718840211605
                    ],
                    [
                        -100.008544921875,
                        39.01064750994083
                    ],
                    [
                        -99.86572265625,
                        39.00211029922512
                    ],
                    [
                        -99.6844482421875,
                        38.97222194853654
                    ],
                    [
                        -99.51416015625,
                        38.929502416386605
                    ],
                    [
                        -99.38232421875,
                        38.92095542046727
                    ],
                    [
                        -99.3218994140625,
                        38.89530825492018
                    ],
                    [
                        -99.1131591796875,
                        38.86965182408357
                    ],
                    [
                        -99.0802001953125,
                        38.85682013474361
                    ],
                    [
                        -98.82202148437499,
                        38.85682013474361
                    ],
                    [
                        -98.44848632812499,
                        38.84826438869913
                    ],
                    [
                        -98.20678710937499,
                        38.84826438869913
                    ],
                    [
                        -98.02001953125,
                        38.8782049970615
                    ],
                    [
                        -97.635498046875,
                        38.87392853923629
                    ]
                ]
            },

        }
    }

    /*TODO: MAKE DRY CODE*/
    changeEmail = ev => this.props.updateFieldAuth('email', ev.target.value);
    changePassword = ev => this.props.updateFieldAuth('password', ev.target.value);
    changeName = ev => this.props.updateFieldAuth('name', ev.target.value);
    changeVendor = ev => this.props.updateFieldAuth('vendor', ev.target.value);

    tryLogin = (email, password) => ev => {
        ev.preventDefault();
        this.props.onSubmit(email, password);
    };

    componentDidMount() {
        const projection = geoMercator();
        const pathGenerator = geoPath().projection(projection)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.register) {
            this.setState({
                ...this.state,
                register: true
            })
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const name = this.props.name;
        const vendor = this.props.vendor;


        const projection = geoMercator().fitExtent([[0, 0], [150, this.state.svgHeight]], this.state.geojson);
        const pathGenerator = geoPath().projection(projection)

        var jumbotronStyle = {
            backgroundImage: 'url(' + "https://d3i6fh83elv35t.cloudfront.net/static/2018/03/TOC_MLT_lowering_1280-1200x675.jpg" + ')'
        }

        return (
            <div className="login-wrapper">


                <div className="login-sidebar">
                    <img src={require('../Assets/V5.png')}
                         style={{width: '20vh', height: '20vh', marginBottom: '2vh'}}></img>
                    <div className="modal-container login">
                        <div className="modal-header">
                            <h3 className="header-title">Account</h3>
                            <span className="header-sub">Create an Account or Login to Journey</span>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={this.tryLogin(email, password)}>
                                <div className="button-general" onClick={() => history.push('/home')}>Login
                                    with Facebook
                                </div>

                                <button type="submit" className="nodisplay"></button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

//
//
// <div className="login-input-set">
//     {this.state.register ?
//         <input type="text" className="input-general" placeholder="Your Name"
//                value={name}
//                onChange={this.changeName}/>
//         : null}
//     {this.state.register ?
//         <input type="text" className="input-general" placeholder="Organization"
//                value={vendor}
//                onChange={this.changeVendor}/> : null}
//     <input type="text" className="input-general" placeholder="Email Address"
//            value={email}
//            onChange={this.changeEmail}/>
//     <input className="input-general"
//            type="password"
//            placeholder="Password"
//            value={password}
//            onChange={this.changePassword}/>
// </div>


// {
//     this.state.register ?
//         <div>
//             <div>
//
//                 <p> Before proceeding, please accept our <u>Terms & Conditions!</u>
//                 </p>
//             </div>
//             <div style={{margin: '12px 0px', display: 'flex'}}>
//                 <input type="checkbox"
//                        style={{alignSelf: 'center'}}
//                        checked={this.state.checked}
//                        onChange={() => this.changeHandler()}/> &emsp; I accept Gifty's&nbsp;
//                 <u>
//                     Terms
//                     & Conditions</u>
//             </div>
//             <div className="button-general"
//                  onClick={() => this.props.onRegister(name, vendor, email, password, this.state.checked)}>
//                 Register
//             </div>
//         </div>
//         : <div className="button-general" onClick={()=> this.tryLogin(email, password)}>Enter
//         </div>
// }


/*             <div className={"login-jumbotron"}
                     style={jumbotronStyle}
                >
                    <div className={'logo-container'}>
                        <img className="logo"
                             src={'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/The_Ocean_Cleanup_logo.svg/1200px-The_Ocean_Cleanup_logo.svg.png'}/>
                    </div>

                    <div className={'cause-sidebar'}>

                        <div className={'cause-container'}>

                            <div style={{paddingRight: '20px'}}>
ACTIVE OCEAN CLEAN UP                       </div>


                            <div className={'cause-border'}>
                                <img className={'cause-img'}
                                     src={"https://instagram.fyyc3-1.fna.fbcdn.net/vp/1141f0bf7f4ec821b0bad388584d3d11/5B42A253/t51.2885-15/s640x640/sh0.08/e35/29088451_2115294828752208_1528498798161035264_n.jpg"}/>
                            </div>

                        </div>
                        <div className={'cause-container'}>

                            <div style={{paddingRight: '20px'}}>
                                CONSUMER EDUCATION
                            </div>


                            <div className={'cause-border'}>
                                <img className={'cause-img'}
                                     src={"https://instagram.fyyc3-1.fna.fbcdn.net/vp/2b0cae52c4b50fca5430121617e1ca62/5B48B1DA/t51.2885-15/sh0.08/e35/p640x640/28152611_303664316824884_7975040848834330624_n.jpg"}/>
                            </div>

                        </div>


                        <div className={'live-container'}>
                            <div className={'cause-info'}>
                                <div className={'cause-title'}>
                                    Live
                                </div>
                                <div className={'cause-subtitle'}>
                                    NORTH SEA CLEANUP
                                </div>

                                <div className={'metrics'}>
                                    <div>
                                        <Icon viewBox="0 0 40 40" style={{paddingBottom: '4px'}} size={20}
                                              onClick={() => this.props.menuToggle(!this.props.sidebarOpen)}>
                                            <g>
                                                <path
                                                    d="m20 2.5c6.9 0 12.5 5.5 12.5 12.3 0 9.2-12.5 22.7-12.5 22.7s-12.5-13.5-12.5-22.7c0-6.8 5.6-12.3 12.5-12.3z m0 16.6c2.5 0 4.5-1.9 4.5-4.3s-2-4.4-4.5-4.4-4.5 1.9-4.5 4.4 2 4.3 4.5 4.3z"/>
                                            </g>
                                        </Icon> North Sea
                                    </div>
                                    <div>
                                        <Icon viewBox="0 0 40 40" style={{paddingBottom: '4px'}} size={20}
                                              onClick={() => this.props.menuToggle(!this.props.sidebarOpen)}>
                                            <g>
                                                <path
                                                    d="m33.3 7.5c3.6 3.7 3.6 9.7 0 13.4l-13.5 14.1-13.6-14.1c-3.6-3.7-3.6-9.7 0-13.4 3.1-3.3 8.3-3.3 11.4 0l2.2 2.2 2.1-2.2c3.2-3.3 8.3-3.3 11.4 0z"/>
                                            </g>
                                        </Icon> 140
                                    </div>
                                </div>

                                <div className={'funding'}>
                                    Daily Goal: $80/$100
                                    <div className={'chart-container'}>
                                        <div className={'percentage'}>
                                        </div>
                                        <div className={'total'}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={'flip-card'}>
                                <FlipCard>

                                    <div className={'cause-border'}>
                                        <img className={'cause-img'}
                                             src={"https://instagram.fyyc3-1.fna.fbcdn.net/vp/893b00282927bd0013be03d2ede8d370/5B4EA86C/t51.2885-15/s640x640/sh0.08/e35/28153735_2041859079428751_2813242353844748288_n.jpg"}/>
                                    </div>
                                    <div className={'cause-border'}>
                                        <div className={'flip-card-back'}>
                                            <svg height="170" width="100">
                                                <path d={pathGenerator(this.state.geojson)} fill="none" stroke="white" strokeWidth="3px" />
                                            </svg>
                                        </div>
                                    </div>
                                </FlipCard>
                            </div>


                        </div>
                    </div>


                </div>*/