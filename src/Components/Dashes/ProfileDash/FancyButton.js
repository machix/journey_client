import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as basicScroll from '../../../Helpers/basicScroll.min';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});


class FancyButton extends Component {

    /*  --- STATE
     ------------------------------------------ */
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const titleElement = basicScroll.create({
            elem: document.querySelector('.fancy-flipper'),
            from: 'bottom-middle',
            to: 'top-top',
            direct: true,
            props: {
                '--fancy-button-rotation': {
                    from: '-90deg',
                    to: '10deg'
                },
            }
        });
        titleElement.start();
    }

    render() {
        // Mask id and styling
        // need unique id's for multiple buttons
        const maskId = 'mask_1';
        const maskStyle = '#fancy-masked-element_' + maskId + ' { mask: url(#' + maskId + '); -webkit-mask: url(#' + maskId + ')}';

        const buttonStyle = {
            width: this.props.width,
            height: this.props.height
        };

        const fancyFrontStyle = {
            transform: 'rotateX(0deg) translateZ(' + this.props.height / 2 + 'px )'
        };

        const fancyBackStyle = {
            transform: 'rotateX(90deg) translateZ( ' + this.props.height / 2 + 'px )'
        };

        // SVG attributes
        const textTransform = 'matrix(1 0 0 1 ' + this.props.width / 2 + ' ' + this.props.height / 1.6 + ')';
        const viewBox = '0 0 ' + this.props.width + ' ' + this.props.height;

        return (
            <div className="fancy-button"
                 style={buttonStyle}
                 ref="fancyButton">
                <div className="fancy-flipper">
                    <div className="fancy-back" style={fancyBackStyle}>
                        <svg
                            height={this.props.height}
                            width={this.props.width}
                            viewBox={viewBox}>
                            <rect stroke={this.props.color}
                                  strokeWidth={this.props.borderWidth}
                                  fill="transparent"
                                  width="100%"
                                  height="100%"/>
                            <text className="button-text" transform={textTransform} fill={this.props.color}
                                  fontFamily="'intro_regular'" fontSize={this.props.fontSize} textAnchor="middle"
                                  letterSpacing="1">{this.props.buttonText}</text>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }
}

FancyButton.defaultProps = {
    color: 'white',
    width: 800,
    height: 100,
    fontSize: 40,
    borderWidth: 15,
    buttonText: 'From Alaska to Calgary',
};


export default connect(mapStateToProps, mapDispatchToProps)(FancyButton);
