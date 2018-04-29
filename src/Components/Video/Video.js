import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactPlayer from 'react-player';


const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({});


class Video extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playing: false
        }

    }


    membersMap = () => {
        return Object.keys(this.state.members).map(function (key, index) {
            return (
                <div key={index} className="member-container hvr-grow">
                    <div className={'member'}
                         style={{
                             backgroundImage: `url(${this.state.members[key]})`,

                             backgroundSize: 'cover',
                         }}
                    >
                    </div>
                </div>)
        }, this);
    };

    render() {
        return (
            <div className={'player-wrapper'}>
                <ReactPlayer className={'react-player'}
                             width='100%'
                             height='100%'
                             url={this.props.url}
                             controls
                             // playing={this.state.playing}
                             // playsinline={true}
                             // autoplay={true}
                             // onReady={() => {
                             //     console.log('onReadyCalled');
                             //     this.setState({...this.state, playing: true})
                             // }}
                />
            </div>

        );
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Video));
