import React from 'react';

import StripeWrapper from './Stripe/StripeWrapper';
import PageFade from '../../../Helpers/PageFade'

const StripeCard = (props) => {
    return <section className="list">
        <div className=" no-select">

                <h3>Provide your Billing Information Below </h3>
                <br/>
        </div>
        <div className="list-content">
            <div className="list-rows">
                <div className="list-row">
                    <div className="list-cell small">
                        <StripeWrapper></StripeWrapper>
                    </div>
                </div>
            </div>
        </div>
    </section>

};
export default StripeCard;
