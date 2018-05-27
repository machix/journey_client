import React from 'react';
import {StripeProvider} from 'react-stripe-elements';
import MyStoreCheckout from './MyStoreCheckout';

class StripeWrapper extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            /*Test API Key*/
            <StripeProvider apiKey="pk_test_vCZDlNlODYMEdX159yzNdRcp">
                <MyStoreCheckout color={this.props.color}/>
            </StripeProvider>
        );
    }
};

export default StripeWrapper;

//pk_live_HA42QCFRhKVCjtW2dAclmj3j