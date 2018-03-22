import React from 'react';

import StripeWrapper from './Stripe/StripeWrapper';
import PageFade from '../../../Helpers/PageFade'

const StripeCard = (props) => {
    return <PageFade>
        <section className="list">
            <div className="list-header no-select">
                <div className="header-copy">
                    <h4>Edit your Billing Information Below </h4>
                </div>
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
    </PageFade>

};
export default StripeCard;
