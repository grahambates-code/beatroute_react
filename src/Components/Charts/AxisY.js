import React, { useContext, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartContext from './ChartContext';

const AxisY = ({ format, tickPadding, tickSizeOuter, ticks }) => {
    const context = useContext(ChartContext);
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (ref) {
            d3.select(ref.current)
                .transition()
                .call(
                    d3.axisLeft(context.yScale)
                        .tickSize(-context.innerWidth)
                        .tickFormat(format)
                        .tickPadding(tickPadding)
                        .ticks(ticks)
                );
        }
    });

    return (
        <g 
            ref={ref}
            className="axis axis-y" 
            transform="translate(0, 0)"
        />
    );
};

AxisY.defaultProps = {
    format: (d) => d3.format('.2f')(d),
    tickPadding: 8,
    ticks: 6,
    tickSizeOuter: 0
};

export default AxisY;

