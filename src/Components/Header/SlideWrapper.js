import React from 'react';
import {Motion, spring} from 'react-motion';

export default class SlideWrapper extends React.Component {

    position = (location) => {
        switch(location) {
            case 1:
                return 0
            case 2:
                return (this.props.selectorWidth+11)/this.props.totalWidth*100;
            case 4:
                return (this.props.selectorWidth+11)*2/this.props.totalWidth*100;
            case 12:
                return (this.props.selectorWidth+11)*3/this.props.totalWidth*100;
            case 52:
                return (this.props.selectorWidth+10)*4/this.props.totalWidth*100;
            case 0:
                return (this.props.totalWidth-this.props.selectorWidth-12)/this.props.totalWidth*100;
            case -1:
                return 0
            default:
                return 0;
        }
    }

    render() {
      /*  console.log(this.state);*/
        return (
            <div style={{
            width: '100%',
            overflowX: 'hidden'
            }
            }>
                <Motion style={{x: spring(this.position(this.props.dateFilter))}}>
                    {({x}) =>
                        // children is a callback which should accept the current value of
                        // `style`
                        <div style={this.props.dateFilter !== -1 ? {WebkitTransform: `translate3d(${x}%, 0, 0)`,
                transform: `translate3d(${x}%, 0, 0)`,
                position: 'relative',
                zIndex: '-1',
                opacity: '1'} : {opacity: 0,
                position: 'relative',
                zIndex: '-1'} }>
                            <div style={{
                                    backgroundColor: ' #99ede6',
                                    width: this.props.selectorWidth + 'px',
                                    height: this.props.selectorHeight +'px',
                                    position: 'fixed',
                                    borderRadius: '3px',
                                    }}>
                            </div>
                        </div>
                    }
                </Motion>
                {this.props.children}
            </div>
        );
    };
}