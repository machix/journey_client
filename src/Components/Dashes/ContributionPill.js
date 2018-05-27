import React, {Component} from 'react';
import {connect} from 'react-redux';
import {MARKER_COLORS} from '../../Helpers/constants';


const mapStateToProps = (state, ownProps) => ({

    thumbnails: state.profile.thumbnails,
    displayMobile: ownProps.displayMobile
});

const mapDispatchToProps = dispatch => ({});

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}


class Statistics extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        this.state = {
            isHover: false,
            backgroundColor: MARKER_COLORS[Math.floor(Math.random() * MARKER_COLORS.length)]
        }
    }

    hoverOn = (event) => {
        this.setState({
            isHover: true
        })
    };

    hoverOff = (event) => {
        this.setState({
            isHover: false
        })
    };


    render() {
        return (
            <div className={'pill hvr-grow'}
                 onMouseEnter={this.hoverOn}
                 onMouseLeave={this.hoverOff}
                 onClick={()=>this.props.onClick()}
                 style={{backgroundColor: this.state.backgroundColor}}>
                {this.state.isHover ? <div className={'slideInVertical'} >Contribute</div> : this.props.string}

            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
