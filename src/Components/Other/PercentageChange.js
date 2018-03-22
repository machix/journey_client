import React, { Component } from 'react';

class PercentageChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            description: props.description
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
            description: nextProps.description
        });
    };

    willItRender() {

        return <div className="overview-block">
            <div className="block-value">{this.state.value} </div>
            <div className="block-label conditional-display"> {this.state.description}</div>
            <div className="block-label conditional-nodisplay-desktop"> Percent Change</div>

        </div>
    }

    render() {
        return (
            /*<CSSTransitionGroup
             transitionName="example"
             transitionEnterTimeout={500}
             transitionLeaveTimeout={300}>
             {*/this.willItRender()/*}
             </CSSTransitionGroup>*/
        )
    }
}


export default PercentageChange;

