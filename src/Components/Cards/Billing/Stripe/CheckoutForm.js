import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import {CardElement} from 'react-stripe-elements';

const Success = () => {
    return (
        <div className="feedback-indication">
            <div className="indicator success"></div>
            <div>
                Thank you!
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
        this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
            if (typeof token === 'undefined') {
                this.setState({
                    success: false,
                    error: true
                })
                this._element.clear();

            } else {
                this.setState({
                    success: true,
                    error: false
                })
                this._element.clear();

            }

        }).catch((error)=> {
                this.setState({
                    success: false,
                    error: true
                })
                this._element.clear();
            }
        );


        // However, this line of code will do the same thing:
        // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <CardElement elementRef={(c) => this._element = c}
                                 style={{base: {fontSize: '18px'}, paddingRight: '10px'}}/>
                </label>
                <div className="top-border" style={{marginTop: '8px', paddingTop: '8px'}}>
                    {this.state.success === true ? <Success></Success> : null}
                    {this.state.error === true ? <Error/> : null }
                    <div onClick={(e)=>this.handleSubmit(e)} className="button button-small button-blue">Submit
                    </div>
                    <button className="nodisplay"></button>
                </div>
            </form>

        );
    }
}

export default injectStripe(CheckoutForm);

