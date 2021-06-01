import React, { useContext } from 'react';
import ChartContext from './ChartContext';
import Scatter from './Scatter';

const LineScatter = ({ color, radius, data }) => {
    const context = useContext(ChartContext);

    return (
        <Scatter 
            data={data}
            color={color}
            xScale={context.xScale}
            yScale={context.yScale}
            radius={radius}
        />
    );
};

export default LineScatter;