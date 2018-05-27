import React from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class MyStoreCheckout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Elements>
                <CheckoutForm color={this.props.color} />
            </Elements>
        );
    }
}

export default MyStoreCheckout;