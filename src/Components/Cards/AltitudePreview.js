import React, {Component} from 'react';
import {connect} from 'react-redux';

import CustomizedAxisTick from '../../Helpers/customizedAxisTick';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';


const mapStateToProps = state => ({
    liveJourneyData: state.common.liveJourneyData,
});

const mapDispatchToProps = dispatch => ({});


class AltitudePreview extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.liveJourneyData);
    }

    render() {
        return <ResponsiveContainer width="100%" height={200}>
            <LineChart margin={{top: 20, right: 50, left: 0, bottom: 0}}

                       onClick={(data, index) => {
                           console.log('click');
                           console.log(data);
                           console.log(index)
                       }}
                       onMouseEnter={line => {
                           console.log(line);
                       }}
                       data={this.props.liveJourneyData}>
                <Line type='monotone' dataKey='altitude' stroke='#8884d8' strokeWidth={2}


                />
                <XAxis dataKey="coordinates" tick={<CustomizedAxisTick/>}/>
                <YAxis domain={[1, 'dataMax']} interval={1}/>
                <Tooltip/>
            </LineChart>
        </ResponsiveContainer>

            ;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AltitudePreview);
