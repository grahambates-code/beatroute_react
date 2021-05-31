import React, { useContext, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartContext from './ChartContext';

const AxisX = ({ format, tickPadding, tickSizeOuter }) => {
    const context = useContext(ChartContext);
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (ref) {
            d3.select(ref.current)
                .transition()
                .call(
                    d3.axisBottom(context.xScale)
                        .tickFormat(format)
                        .tickPadding(tickPadding)
                        .tickSizeOuter(tickSizeOuter)
                );
        }
    });

    return (
        <g 
            ref={ref}
            className="axis axis-x" 
            transform={`translate(0, ${context.innerHeight})`} 
        />
    );
};

AxisX.defaultProps = {
    // format: (d) => d3.format('.2f')(d),
    tickPadding: 8,
    tickSizeOuter: 0
};

export default AxisX;

