import React, { useRef } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ConnectCharts from '../../../../Charts/ConnectCharts';
import LineBrush from '../../../../Charts/LineBrush';
import LineScatter from '../../../../Charts/LineScatter';
import LineMagnifyingView from '../../../../Charts/LineMagnifyingView';

const AltitudeChartHeader = ({ card, refetch, onSelection, onRange, gps_data=[] }) => {
    const brushFocusRef = useRef(null);

              //  console.log( gps_data);

                const lineData = gps_data.map((feature, i) => ({
                    x: i,
                    y: feature.properties.elevation
                }));

               // return <pre>{JSON.stringify(lineData)}</pre>

                return (
                    <ConnectCharts>
                        <LineBrush
                            height={150}
                            data={lineData}
                            color="#ec407a"
                            margin={{
                                top: 16,
                                left: 16,
                                right: 16,
                                bottom: 16
                            }}
                            onSelection={(focus) => {
                                const prevFocus = brushFocusRef.current;
                                if (!prevFocus || ((focus[0] !== prevFocus[0] || focus[1] !== prevFocus[1]))) {
                                    const xRange = [Math.floor(focus[0]), Math.ceil(focus[1])];
                                    const subFeatures = gps_data.slice(xRange[0], xRange[1]);
                                    const subCoordinates = subFeatures.map(feature => feature.geometry.coordinates);

                                    brushFocusRef.current = focus;

                                    if (onSelection) {
                                        onSelection(subCoordinates);
                                    }

                                    if (onRange) {
                                        onRange(xRange);
                                    }
                                }
                            }}
                        >
                            <LineScatter color="#2196f3" radius={7} />
                            <LineMagnifyingView  color="#ec407a" />
                        </LineBrush>
                    </ConnectCharts>

    );
};

export default React.memo(
    AltitudeChartHeader,
    (prevProps, nextProps) => prevProps.card.id === nextProps.card.id
);
