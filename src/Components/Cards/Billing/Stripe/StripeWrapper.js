import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

class StripeWrapper extends React.Component {

    render() {
        return (
            /*Test API Key*/
            <StripeProvider apiKey="pk_live_HA42QCFRhKVCjtW2dAclmj3j">
                <MyStoreCheckout />
            </StripeProvider>
        );
    }
};

export default StripeWrapper;