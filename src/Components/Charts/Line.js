import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';

const Line = ({ xScale, yScale, width, height, data, color, forwardRef,  }) => {
    const lineRef = useRef(null);
    const areaRef = useRef(null);

    useLayoutEffect(() => {
        if (lineRef) {
            const lineGenerator = d3.line()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
                .curve(d3.curveLinear);

            d3.select(lineRef.current)
                .datum(data)
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr('d', lineGenerator);
        }

        if (areaRef) {
            const areaGenerator = d3.area()
                .defined(d => !isNaN(d.y))
                .x(d => xScale(d.x))
                .y0(yScale.range()[0])
                .y1(d => yScale(d.y))
                .curve(d3.curveLinear);
            
            d3.select(areaRef.current)
                .datum(data)
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr('d', areaGenerator);
        }
    });

    return (
        <g ref={forwardRef}>
            <g className="lines-group">
                <path 
                    ref={lineRef}
                    className="line" 
                    stroke={color}
                />
            </g>
            <g className="areas-group">
                <path 
                    ref={areaRef}
                    className="area" 
                    fill="url(#def-linear-gradient)"
                />
            </g>
        </g>
    );
};

export default Line;
