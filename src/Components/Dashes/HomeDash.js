import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import EXIF from 'exif-js'

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

    handleImageLoaded(e) {
        console.log(e.target);
        console.log(this.refs.img1)
        console.log(EXIF.getData);
        EXIF.getData(this.refs.img1, function () {
            console.log('getData');
            var make = EXIF.getTag(this, "Make");
            var model = EXIF.getTag(this, "Model");
            console.log(make);
            console.log(model);
        })
    }


    render() {
        return (
            <HOC>
                <PageFade>

                    <img
                        ref={'img1'}
                        onLoad={this.handleImageLoaded.bind(this)}
                        style={{height: '80vh', width: 'auto', imageOrientation: '90deg'}}
                        src={'asf'}/>

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