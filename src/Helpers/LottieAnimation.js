import React, {Component} from 'react';
import lottie from 'lottie-web';


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class LottieAnimation extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.lottie = lottie.loadAnimation({
            container: this.animation, // the dom element
            renderer: 'svg',
            loop: false,
            autoplay: this.props.autoplay,
            animationData: this.props.animationData, // the animation data
            rendererSettings: {
                scaleMode: 'noScale',
                clearCanvas: false,
                progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
                hideOnTransparent: true //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.liked === true ) {
            this.lottie.setDirection(1);

            this.lottie.play();
        } else {
            this.lottie.setDirection(-1);
            this.lottie.play();
        }
    }

    render() {

        return (
            <div style={{pointerEvents: 'none', display: 'flex', alignItems: 'center'}} ref={(animation) => {
                this.animation = animation;
            }}></div>

        );
    }
}


export default LottieAnimation;