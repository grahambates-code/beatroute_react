import React, { useEffect, useRef } from 'react';
import { LineChart } from './LineChart';


const LineChartComponent = (props) => {
    const ref = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        lineChartRef.current = new LineChart({
            data: [],
            dimension: props.dimension,
            color: props.color,
        });

        lineChartRef.current.parentEl = ref.current;
    }, []);

    useEffect(() => {
        lineChartRef.current.update(props.data);
    }, [props.data]);

    useEffect(() => {
        lineChartRef.current.xAxis = props.xAxis;
        lineChartRef.current.yAxis = props.yAxis;
    }, [props.xAxis, props.yAxis]);


    return (
        <div className="chart-wrapper chart-line" ref={ref}>
            <svg />
        </div>
    );
};

export default LineChartComponent;