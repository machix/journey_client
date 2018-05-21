import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as basicScroll from '../../../Helpers/basicScroll.min';


const mapStateToProps = state => ({
    windowWidth: state.common.windowWidth * 0.9
});

const mapDispatchToProps = dispatch => ({});


class FancyButton extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
        console.log('fancybutton');
        console.log(this.props.windowWidth);
    }

    componentDidMount() {

        setTimeout(() => {
            this.titleElement = basicScroll.create({
                elem: document.querySelector('.fancy-flipper'),
                from: 'bottom-middle',
                to: 'top-top',
                direct: true,
                inside: (instance, percentage, props) => {
                    console.log(instance);
                    console.log(percentage);
                    console.log(props)
                },
                props: {
                    '--fancy-button-rotation': {
                        from: '-90deg',
                        to: '10deg'
                    },
                }
            });
            this.titleElement.start();
        }, 100)

    }

    componentWillUnmount() {
        this.titleElement.destroy();
    }

    render() {
        // Mask id and styling
        // need unique id's for multiple buttons
        const maskId = 'mask_1';
        const maskStyle = '#fancy-masked-element_' + maskId + ' { mask: url(#' + maskId + '); -webkit-mask: url(#' + maskId + ')}';

        const buttonStyle = {
            width: this.props.windowWidth,
            // height: this.props.height
        };

        const fancyBackStyle = {
            transform: 'rotateX(90deg) translateZ( ' + this.props.height / 2 + 'px )',
        };


        return (
            <div className="fancy-button"
                 style={buttonStyle}
                 ref="fancyButton">
                <div className="fancy-flipper">
                    <div className="fancy-back" style={fancyBackStyle}>

                        <div className="button-text">{this.props.buttonText}</div>
                    </div>
                </div>
            </div>
        );
    }
}

FancyButton.defaultProps = {
    color: 'white',
    width: 1000,
    height: 100,
    borderWidth: 15,
    buttonText: 'Alaska to Calgary',
};


export default connect(mapStateToProps, mapDispatchToProps)(FancyButton);
