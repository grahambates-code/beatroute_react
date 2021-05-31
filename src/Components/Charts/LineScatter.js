import React, { useContext, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartContext from './ChartContext';

const LineScatter = ({ color, radius, data }) => {
    const context = useContext(ChartContext);
    const circleRef = useRef(null);

    useLayoutEffect(() => {
        if (data) {
            d3.select(circleRef.current)
                .transition()
                .attr('cx', context.xScale(data.x))
                .attr('cy', context.yScale(data.y));
        }
    }, [data, context]);

    if (!data) {
        return null;
    }

    return (
        <g className="chart-line-scatters">
            <circle 
                ref={circleRef}
                r={radius || 8}
                fill={color || '#000'}
                stroke="#fff"
                strokeWidth={2}
            />
        </g>
    );
};

export default LineScatter;