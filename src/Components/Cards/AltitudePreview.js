import React, {Component} from 'react';
import {connect} from 'react-redux';

import CustomizedAxisTick from '../../Helpers/customizedAxisTick';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot} from 'recharts';


const mapStateToProps = state => ({
    liveJourneyData: state.common.liveJourneyData,
    currentIndex: state.mapview.currentIndex
});

const mapDispatchToProps = dispatch => ({
    setCurrentIndex: (index) => dispatch({
        type: 'SET_CURRENT_INDEX',
        value: index
    }),
});


class AltitudePreview extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props.liveJourneyData);
    }
    componentDidMount() {
        console.log(this.props.liveJourneyData);
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps);
    }

    render() {
        return <ResponsiveContainer width="100%" height={300}>
            <LineChart margin={{top: 20, right: 50, left: 0, bottom: 0}}
                       onClick={(data, index) => {
                           if(data === null) {

                           } else {
                               console.log('click');
                               console.log(data);
                               console.log(index);
                               this.props.setCurrentIndex(data.activeTooltipIndex);
                           }

                       }}
                       onMouseEnter={line => {
                           console.log(line);
                       }}
                       data={this.props.liveJourneyData}>
                <Line type='monotone' dataKey='altitude' stroke='#8884d8' strokeWidth={2}
                />
                {this.props.liveJourneyData.length > 0 ?
                    <ReferenceDot
                                  x={this.props.liveJourneyData[this.props.currentIndex].timestamp}
                                  y={this.props.liveJourneyData[this.props.currentIndex].altitude}
                                  r={7}
                                  alwaysShow={true}
                                  isFront={true}
                                  fill="#8686D2" stroke="none"/>
                    : null}
                <XAxis label={{ value: "Distance (km)", position: 'insideBottom', offset: -20 }} dataKey="distance" tick={<CustomizedAxisTick/>}/>
                <YAxis label={{ value: "Altitude (m)", angle: -90, position: 'insideLeft'}}  domain={['auto', 'auto']} interval={1}/>
                <Tooltip/>
            </LineChart>
        </ResponsiveContainer>

            ;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AltitudePreview);
