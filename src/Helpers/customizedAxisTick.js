import React from 'react';

const CustomizedAxisTick = React.createClass({
    render () {
        const {x, y, stroke, payload} = this.props;

        return (
            <g className="recharts-text" transform={`translate(${x},${y})`}>
                <text x={0} y={3} dy={16} textAnchor="middle" >{payload.value}</text>
            </g>
        );
    }
});

export default CustomizedAxisTick;