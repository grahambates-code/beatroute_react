import React, { useRef, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ConnectCharts from '../../../../Charts/ConnectCharts';
// import LineChart from '../../../../Charts/LineChart';
import LineBrush from '../../../../Charts/LineBrush';
// import AxisX from '../../../../Charts/AxisX';
// import AxisY from '../../../../Charts/AxisY';
// import LineMagnifyingView from '../../../../Charts/LineMagnifyingView';
import LineScatter from '../../../../Charts/LineScatter';

const GET_EXTRA = gql`
    query MyQuery($card_id : Int) {
        gps_data(where: {card_id: {_eq: $card_id}}) {
        card_id
        data
    }
}`

const AltitudeChart = ({ card, refetch, onSelection }) => {
    const brushFocusRef = useRef(null);

    return (
        <Query query={GET_EXTRA} variables={{card_id : card.id}} >
            {({ loading, error, data  }) => {
                if (loading || !data || !data.gps_data.length) {
                    return null
                };

                const { data: { features } } = data.gps_data[0];
                const lineData = features.map((feature) => ({ 
                    x: feature.geometry.coordinates[0], 
                    y: feature.geometry.coordinates[1] 
                })).sort((a, b) => a.x - b.x);

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
                                    const subData = [];

                                    for (const data of lineData) {
                                        if (data.x >= focus[0] && data.x <= focus[1]) {
                                            subData.push([data.x, data.y]);
                                        }
                                    }

                                    brushFocusRef.current = focus;

                                    if (onSelection) {
                                        onSelection(subData);
                                    }
                                }
                            }}
                        >
                            <LineScatter
                                data={undefined}
                                color="#2196f3"
                                radius={7}
                            />
                        </LineBrush>
                    </ConnectCharts>
                );
            }}
        </Query>
    );
};

export default React.memo(
    AltitudeChart, 
    (prevProps, nextProps) => prevProps.card === nextProps.card
);
