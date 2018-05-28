import React from 'react';
import moment from 'moment';

const CustomizedAxisTick = React.createClass({
    render () {
        const {x, y, stroke, payload} = this.props;

        return (
            <g className="recharts-text" transform={`translate(${x},${y})`}>
                <text x={0} y={3} dy={16} textAnchor="middle" >{payload.value + ' km'}</text>
            </g>
        );
    }
});

export default CustomizedAxisTick;