import React from 'react';
import {connect} from 'react-redux';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';

import agent from '../../../../Helpers/agent';

const Success = () => {
    return (
        <div className="feedback-indication">
            <div className="indicator success"></div>
            <div>
                Thank you! This will be displayed on the Journey shortly
            </div>
        </div>
    )
}

const Error = () => {
    return (
        <div className="feedback-indication">
            <div className="indicator error"></div>
            <div>
                Oh, an error? Please try again!
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    contributionValue: state.common.contributionValue

});

const mapDispatchToProps = dispatch => ({});


class CheckoutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            success: false
        }
    }


    handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        // Within the context of `Elements`, this call to createToken knows which Element to
        // tokenize, since there's only one in this group.

        if (this.props.contributionValue === null) {
            alert('Please select a Contribution first!');
        } else {
            this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
                console.log('token received: ' + token);
                if (typeof token === 'undefined') {
                    this.setState({
                        success: false,
                        error: true
                    });
                    this._element.clear();

                } else {
                    console.log(token);
                    this.setState({
                        success: true,
                        error: false
                    });
                    agent.common.stripePurchase(token, this.props.contributionValue);

                    this._element.clear();
                }

            }).catch((error) => {
                    this.setState({
                        success: false,
                        error: true
                    })
                    this._element.clear();
                }
            );

        }


        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder={'Your Name: (Optional)'}/>
                <label>
                    <CardElement elementRef={(c) => this._element = c}
                                 style={{

                                     base: {
                                         fontSize: '18px', color: this.props.color,
                                         iconColor: this.props.color,
                                         '::placeholder': {
                                             color: this.props.color,
                                         },
                                         textShadow: '0 1px 3px rgba(0, 0, 0, .4), 0 0 30px rgba(0, 0, 0, .075)'
                                     },

                                     paddingRight: '10px'
                                 }}/>
                </label>
                <div className="top-border" style={{marginTop: '8px', paddingTop: '8px'}}>
                    {this.state.success === true ? <Success></Success> : null}
                    {this.state.error === true ? <Error/> : null}
                    {this.state.success === true ? null :
                        <div onClick={(e) => this.handleSubmit(e)} style={{cursor: 'pointer'}}>SUBMIT
                        </div>}
                    <button className="nodisplay"></button>
                </div>
            </form>

        );
    }
}

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm));

