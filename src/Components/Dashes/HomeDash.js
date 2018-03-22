import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ExifOrientationImg from 'react-exif-orientation-img'

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
                            <ExifOrientationImg
                                style={{height: '80vh', width: 'auto', imageOrientation: 'from-image'}}
                                className={'image-view'}
                                src={'https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2F0fcfe593-6f26-4e03-9bb7-e9d53e7143d5.jpg?alt=media&token=b710b974-71f4-45fc-93fd-df0237efd85e=s256'}/>
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