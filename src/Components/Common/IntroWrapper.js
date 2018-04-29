import React, {Component} from 'react';
import agent from '../../Helpers/agent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Transition from 'react-transition-group/Transition';


import {geoPath, geoMercator} from 'd3-geo';




const mapStateToProps = state => ({

    user: state.auth.user

});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(agent.Auth.login()),
});

class IntroWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verbs: ["Explore", "Live", "Inspire", "Define", "Discover", "Celebrate"],
            thing: "Explore",
            whereYou: "Where You",
            message: '',
            mode: 'write',
            verbIndex: 0,
            completed: false
        }
    }


    login = () => {
        console.log('attempting to log in');
        this.props.login();
    };


    componentDidMount() {
        const projection = geoMercator();
        const pathGenerator = geoPath().projection(projection);
        this.timeout = setTimeout(() => this.letterChoreographer(), this.state.delay);
    }


    componentWillUnmount() {
        // this.props.onUnload();
        window.clearTimeout(this.timeout);
    }

    letterChoreographer() {
        switch (this.state.mode) {
            case 'write' :
                if (this.state.thing === 'Celebrate') {
                    this.setState({
                        ...this.state,
                        message: this.state.message + this.state.thing.slice(0, 1),
                        thing: this.state.thing.substr(1),
                        whereYou: '',
                        complete: true,
                    })
                }

                this.setState({
                    ...this.state,
                    message: this.state.message + this.state.thing.slice(0, 1),
                    thing: this.state.thing.substr(1)
                });

                if (this.state.thing.length === 0 && this.state.verbIndex === (this.state.verbs.length - 1)) {
                    window.clearTimeout(this.timeout);
                    return;
                }

                if (this.state.thing.length === 0) {
                    this.setState({
                        ...this.state,
                        mode: 'delete',
                        delay: 2000
                    })

                } else {
                    this.setState({
                        ...this.state,
                        delay: 32 + Math.round(Math.random() * 10)
                    })

                }
                break;

            case 'delete' :

                this.setState({
                    ...this.state,
                    message: this.state.message.slice(0, -1)
                });

                if (this.state.message.length === 0) {
                    let newVerbIndex = this.state.verbIndex + 1;

                    this.setState({
                        ...this.state,
                        mode: 'write',
                        delay: 1000,
                        verbIndex: newVerbIndex,
                        thing: this.state.verbs[newVerbIndex]
                    });
                } else {
                    this.setState({
                        ...this.state,
                        mode: 'delete',
                        delay: 32 + Math.round(Math.random() * 200)
                    });
                }
                break;
        }
        this.timeout = setTimeout(() => this.letterChoreographer(), this.state.delay);
    }

    render() {

        return (

            <div className={'intro-wrapper'}>
                <div className={'title'}>
                    {this.state.whereYou} <span className={'place-holder'}>{this.state.message} {this.state.complete === true ? null :
                    <span className={'place-holder-text'}>!</span>} </span> <span className={'conditional-display'}><br/></span> Adventure.

                </div>
                <div className="facebook-login"
                     onClick={() => this.login()}>
                    <img className={'login-icon'} alt=""
                         src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/> Sign in
                    with
                    Facebook
                </div>

            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntroWrapper));
