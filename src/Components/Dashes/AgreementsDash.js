import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageFade from '../../Helpers/PageFade.js'
import HOC from '../../Helpers/HOC';

import GiftyPreview from '../Cards/GiftyPreview.js';
import CertifiedVendorsPreview from '../Cards/CertifiedVendorsPreview.js';

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({});


class AgreementsDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: false,
            // Auth vars
            auth: {}
        }
    }


    render() {
        return (
            <PageFade>
                <HOC>
                    <div className="main-container">
                        <div className="main">
                            <div className="content">
                                <GiftyPreview></GiftyPreview>
                            </div>
                        </div>
                    </div>
                </HOC>
            </PageFade>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AgreementsDash));