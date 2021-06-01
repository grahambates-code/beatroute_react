import React, { useContext, useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import ChartContainer from './ChartContainer';
import ChartContext from './ChartContext';
import Line from './Line';
import { ConnectChartContext } from './ConnectCharts';
import Scatter from './Scatter';

const LineBrushWrapper = ({ color, scatterData, onSelection, children }) => {
    const connectContext = useContext(ConnectChartContext);
    const context = useContext(ChartContext);
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (ref) {
            const { innerWidth, innerHeight, xScale } = context;
            const brush = d3.brushX()
                .extent([[0, 0], [innerWidth, innerHeight]])
                .on("brush", brushed)
                .on("end", brushEnded);
            
            const brushElement = d3.select(ref.current);
            const defaultSelection = [
                0,
                innerHeight
            ];

            brushElement
                .call(brush)
                .call(brush.move, defaultSelection);

            const radius = context.innerHeight / 2;

            brushElement.select('.selection')
                .attr('rx', radius)
                .attr('ry', radius);

            function brushed({ selection }) {
                const focus = selection.map(xScale.invert, xScale);
                connectContext.updateMagnifyingFocusData(focus);

                if (typeof onSelection === 'function') {
                    onSelection(focus);
                }
            }

            function brushEnded({ selection }) {
                if (!selection) {
                    brushElement.call(brush.move, defaultSelection);
                }
            }
        }
    }, [context]);

    return (
        <g className="line-brush">
            <Line 
                width={context.innerWidth}
                height={context.innerHeight}
                data={context.data}
                xScale={context.xScale}
                yScale={context.yScale}
                color={color}
            />
            {children}
            <g ref={ref} />
        </g>
    );
}

const LineBrush = ({ width, height, margin, data, color, children, onSelection }) => {
    return (
        <ChartContainer
            className="chart-line-brush"
            width={width}
            height={height}
            margin={margin}
            data={data}
            color={color}
        >
            <LineBrushWrapper color={color} onSelection={onSelection}>
                {children}
            </LineBrushWrapper>
        </ChartContainer>
    );
};

export default LineBrush;