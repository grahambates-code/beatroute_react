import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';

const Scatter = ({ color, radius, data, xScale, yScale }) => {
    const circleRef = useRef(null);

    useLayoutEffect(() => {
        if (data) {
            d3.select(circleRef.current)
                .transition()
                .attr('cx', xScale(data.x))
                .attr('cy', yScale(data.y));
        }
    }, [data, xScale, yScale]);

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

export default Scatter;