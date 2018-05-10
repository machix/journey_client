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
                        delay: 32 + Math.round(Math.random() * 100)
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
                    {this.state.whereYou} <span
                    className={'place-holder'}>{this.state.message} {this.state.complete === true ? null :
                    <span className={'place-holder-text'}>!</span>} </span> <span
                    className={'conditional-display'}><br/></span> Adventure.

                </div>
                <div className={'temporary-info-banner'}><br/>
                    <h2>Welcome! I've developed this platform to live broadcast a trip to Alaska with a friend!<br/>
                    </h2>

                    <div className="facebook-login"
                         onClick={() => this.login()}>
                        <img className={'login-icon'} alt=""
                             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"/> Sign in
                        with
                        Facebook
                    </div>
                    <div className={'divider'}>
                        <h3>
                            I'm also currently looking for feedback to help develop the concept of authentic, less-curated experience capture!<br/>

                            <div className="button"
                                 onClick={() => this.login()}>
                                Leave Feedback 😁
                            </div>
                        </h3>
                        <h3>
                            If the idea of this project interests you, you can subscribe here:
                            <div id="mc_embed_signup">
                                <form action="https://linkedin.us18.list-manage.com/subscribe/post?u=e3c7aac8d0c9d9ca1a75a4297&amp;id=914dd63735" method="post" id="mc-embedded-subscribe-htmlForm" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                                    <div id="mc_embed_signup_scroll">
                                        <div id="mce-responses" className="clear">
                                            <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                                            <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
                                        </div>
                                        <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_e3c7aac8d0c9d9ca1a75a4297_914dd63735" tabindex="-1" value=""/></div>
                                        <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></div>
                                    </div>
                                </form>
                            </div>


                        </h3>
                    </div>
                </div>


            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IntroWrapper));
