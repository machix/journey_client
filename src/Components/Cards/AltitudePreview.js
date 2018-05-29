import React, {Component} from 'react';
import {connect} from 'react-redux';

import CustomizedAxisTick from '../../Helpers/customizedAxisTick';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceDot} from 'recharts';


const mapStateToProps = state => ({
    altitudeArray: state.common.altitudeArray,
    indexMap: state.common.indexMap,

    liveJourneyData: state.common.liveJourneyData,
    currentIndex: state.mapview.currentIndex,

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


    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        return <div style={{width: '100%'}}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart margin={{top: 20, right: 50, left: 0, bottom: 0}}
                           onClick={(data, index) => {
                               if (data === null || data.activePayload[0].payload.altitude == null) {

                               } else {
                                   console.log(data);
                                   this.props.setCurrentIndex(data.activePayload[0].payload.markerIndex);
                               }

                           }}
                           data={this.props.altitudeArray}>
                    <Line type='linear' dataKey='altitude' stroke='#8884d8' connectNulls={true} strokeWidth={2}/>
                    {this.props.altitudeArray.length > 0 ?
                        <ReferenceDot
                            x={this.props.altitudeArray[this.props.indexMap[this.props.currentIndex]].distance}
                            y={this.props.altitudeArray[this.props.indexMap[this.props.currentIndex]].altitude}
                            r={7}
                            alwaysShow={true}
                            isFront={true}
                            fill="#8686D2" stroke="none"/>
                        : null}
                    <XAxis label={{value: "Distance (km)", position: 'insideBottom', offset: -20}} minTickGap={80}
                           dataKey="distance" tick={<CustomizedAxisTick/>}/>
                    <YAxis label={{value: "Altitude (m)", angle: -90, position: 'insideLeft'}} domain={['auto', 'auto']}
                           interval={1}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
            ;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AltitudePreview);
