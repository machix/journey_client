import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import StatsPreview from '../Cards/StatsPreview.js';
import ShortSummary from '../Cards/ShortSummary.js';
import GiftyPreviewSlide from '../Cards/GiftyPreviewSlide.js';

import PageFade from '../../Helpers/PageFade.js'
import HOC from '../../Helpers/HOC'
import LoadScreen from '../../Helpers/LoadScreen';

const mapStateToProps = state => ({
    redirectTo: state.common.redirectTo,
    loaderDisplay: state.common.loaderDisplay
});

const mapDispatchToProps = dispatch => ({});


class HomeDash extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);

        this.state = {
            // Data
            loading: true,
            // Auth vars
            auth: {}
        }
    }

    componentWilLReceiveProps(nextProps) {
        if (nextProps.loaderDisplay == false) {
            this.setState({
                loading: false,
            })
        }
    }


    render() {
        return (
            <HOC>
                <PageFade>
                    <div className="main-container">
                        <div className="main">
                            <div className="content">

                            </div>
                        </div>
                    </div>
                </PageFade>
            </HOC>

        )
            ;
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeDash));

/*    <ul className="tabs">
 <li className="tab">
 <a href="#something" className="is-selected">Summary</a>
 </li>
 <li className="tab">
 <a href="#something" className="">Sender Segments</a>
 </li>
 <li className="tab">
 <a href="#something" className="separator">Settings</a>
 </li>
 </ul>*/


//<StatsPreview></StatsPreview>
//<GiftyPreviewSlide></GiftyPreviewSlide>
//<ShortSummary></ShortSummary>