import React, { useLayoutEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import ChartContext from './ChartContext';

import './styles.css';

const ChartContainer = ({ width, height, margin, data, children, color, className }) => {
    const ref = useRef(null);
    const scales = useRef({
        xScale: d3.scaleUtc(),
        yScale: d3.scaleLinear(),
    });

    const [dimension, setDimension] = useState({ 
        width: width,
        height: height,
        innerWidth: 0,
        innerHeight: 0,
    });

    const getDimension = () => {
        const _width = width || ref.current.offsetWidth;
        const _height = height || ref.current.offsetHeight;
        const innerWidth = _width - margin.left - margin.right;
        const innerHeight = _height - margin.top - margin.bottom;

        return {
            width: _width, 
            height: _height,
            innerWidth,
            innerHeight
        }
    };

    useLayoutEffect(() => {
        let timeout = null;

        const handleOnResize = () => {
            if (timeout) {
                clearTimeout(timeout);
            }
    
            timeout = setTimeout(() => {
                if (ref) {
                    setDimension(getDimension());
                }
            }, 500);
        };

        window.addEventListener('resize', handleOnResize);

        return () => {
            window.removeEventListener('resize', handleOnResize);
        }
    }, []);

    useLayoutEffect(() => {
        if (ref) {
            setDimension(getDimension());
        }
    }, [height, width]);

    if (data[0]) {
        if (typeof data[0].x === 'number') {
            scales.current.xScale = d3.scaleLinear();
        }
    }

    scales.current.xScale = scales.current.xScale
        .nice()
        .domain(d3.extent(data, d => d.x))
        .range([0, dimension.innerWidth]);

    scales.current.yScale = scales.current.yScale
        .domain(d3.extent(data, d => d.y))
        .range([dimension.innerHeight, 0]);

    return (
        <ChartContext.Provider 
            value={{
                data,
                margin,
                width: dimension.width,
                height: dimension.height,
                innerWidth: dimension.innerWidth,
                innerHeight: dimension.innerHeight,
                xScale: scales.current.xScale,
                yScale: scales.current.yScale,
            }}
        >
            <div className={`chart ${className}`} ref={ref}>
                <svg xmlns="http://www.w3.org/2000/svg" width={dimension.width} height={dimension.height}>
                    <defs>
                        <linearGradient id="def-linear-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={color} />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {children}
                    </g>
                </svg>
            </div>
        </ChartContext.Provider>
    );
};

ChartContainer.defaultProps = {
    margin: {
        top: 24,
        right: 32,
        bottom: 48,
        left: 48
    },
}

export default ChartContainer;