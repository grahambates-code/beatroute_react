import React, { useContext, useLayoutEffect, useRef } from 'react';
import ChartContainer from './ChartContainer';
import ChartContext from './ChartContext';
import Line from './Line';

const LineChart = ({ width, height, data, margin, color, children }) => {
    //return children
    return (
        <ChartContainer
            className="chart-line"
            width={width}
            height={height}
            margin={margin}
            data={data}
            color={color}
        >
            <ChartContext.Consumer>
                {({ innerWidth, innerHeight, data, xScale, yScale }) => (
                    <Line
                        width={innerWidth}
                        height={innerHeight}
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        color={color}
                    />
                )}
            </ChartContext.Consumer>
            {children}
        </ChartContainer>
    );
};

LineChart.defaultProps = {
    className: 'chart-line'
};

export default LineChart;
