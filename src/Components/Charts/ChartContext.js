import React from 'react';
import * as d3 from 'd3';

const ChartContext = React.createContext({
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    margin: {
        top: 24,
        right: 32,
        bottom: 48,
        left: 48
    },
    data: [],
    xScale: d3.scaleUtc(),
    yScale: d3.scaleLinear(),
    svg: null,
    rootGroup: null,
});

export default ChartContext;
