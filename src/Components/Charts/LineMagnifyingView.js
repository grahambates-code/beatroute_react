import React, { useContext, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartContext from './ChartContext';
import { ConnectChartContext } from './ConnectCharts';
import Line from './Line';
import Scatter from './Scatter';

const LineMagnifyingView = ({ color, enableScatter }) => {
    const chartContext = useContext(ChartContext);
    const ref = useRef(null);
    
    const linePadding = 0;
    const scale = 0.5;
    const padding = 8;
    const width = (Math.min(chartContext.innerWidth, chartContext.innerHeight)) * scale;
    const height = width;
    const radius = height / 2;

    useLayoutEffect(() => {
        if (ref) {
            const el = d3.select(ref.current);

            const drag = d3.drag()
                .on('start', dragStarted)
                .on('drag', dragged);
        
            function dragStarted(event, d) {
                event.sourceEvent.stopPropagation();
            }
            
            function dragged(event, d) {
                el.attr('transform', `translate(${event.x - radius}, ${event.y - radius})`);
            }

            el.call(drag);
        }
    }, [radius]);

    return (
        <g ref={ref}>
            <clipPath id="clipPathDef">
                <circle r={radius + padding} cx={radius} cy={radius} />
            </clipPath>
            <circle 
                r={radius + padding}
                cx={radius}
                cy={radius}
                stroke={color}
                strokeWidth="1"
                fill="#fff"
                cursor="pointer"
            />
            <g clipPath="url(#clipPathDef)">
                <ConnectChartContext.Consumer>
                    {({ magnifyingFocusData }) => (
                        <g transform={`translate(0, ${linePadding})`}>
                            <Line
                                width={width}
                                height={height - linePadding * 2}
                                data={chartContext.data}
                                xScale={chartContext.xScale.copy().range([0, width]).domain(magnifyingFocusData)}
                                yScale={chartContext.yScale.copy().range([height - linePadding * 2, 0])}
                                color={color}
                            />
                        </g>
                    )}
                </ConnectChartContext.Consumer>
            </g>
        </g>
    );
};

export default LineMagnifyingView;