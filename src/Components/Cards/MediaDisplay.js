import React, {Component} from 'react';
import {connect} from 'react-redux';
import Video from '../Video/Video';

const mapStateToProps = (state, ownProps) => ({
    altitudeArray: state.common.altitudeArray,
    indexMap: state.common.indexMap,

    liveJourneyData: state.common.liveJourneyData,
    currentIndex: state.mapview.currentIndex,

    infoWindow: ownProps.infoWindow
});

const mapDispatchToProps = dispatch => ({
    setCurrentIndex: (index) => dispatch({
        type: 'SET_CURRENT_INDEX',
        value: index
    }),
});


class MediaDisplay extends Component {

    constructor(props) {
        super(props);
    }


    renderMedia = () => {
        console.log('render the media');
        if (this.props.liveJourneyData[this.props.currentIndex].dataUploaded === true) {
            switch (this.props.liveJourneyData[this.props.currentIndex].type) {
                case 'image':
                    return <img
                        src={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.currentIndex].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523`}/>
                case 'video':
                    return <Video
                        poster={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_956a93d3-69f6-4af0-b317-d563e97c7b89_thumbnail.png?alt=media&token=f698ce9e-7751-4cc8-8955-2c09f598a87c`}
                        url={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2F${this.props.liveJourneyData[this.props.currentIndex].uid}.mp4?alt=media&token=9f9e06ad-db93-4a22-bdfb-fed973efd936`}/>
            }
        }
    };
    renderMediaInfoWindow = () => {
        if (this.props.liveJourneyData[this.props.currentIndex].dataUploaded === true) {
            switch (this.props.liveJourneyData[this.props.currentIndex].type) {
                case 'image':
                    return <img
                        src={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.currentIndex].uid}.jpg?alt=media&token=ccd5ab02-54bb-4bca-8f2f-9e253de52523`}/>
                case 'video':
                    return <img
                        poster={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_956a93d3-69f6-4af0-b317-d563e97c7b89_thumbnail.png?alt=media&token=f698ce9e-7751-4cc8-8955-2c09f598a87c`}
                        src={`https://firebasestorage.googleapis.com/v0/b/journeyapp91.appspot.com/o/test_journey%2Fjourney_${this.props.liveJourneyData[this.props.currentIndex].uid}_thumbnail.png?alt=media&token=53a595ef-f898-46f8-9822-a5a94bde053b`}/>
            }
        }
    };

    render() {
        return this.props.infoWindow === true ?
            this.props.liveJourneyData.length > 0 ? this.renderMediaInfoWindow() : null : <div className={'media-container'}>
            <div className={'media'}>
                {this.props.liveJourneyData.length > 0 ? this.renderMedia() : null}
            </div>
        </div>
            ;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MediaDisplay);
