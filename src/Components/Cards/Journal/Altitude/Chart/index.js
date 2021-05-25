import React, {Fragment, useState, useEffect} from 'react'
import gql from "graphql-tag";
import {Query} from "react-apollo";
import * as d3 from 'd3'
import LineChart from './libs/charts/line-chart/LineChartComponent'

const GET_EXTRA = gql`
             query MyQuery($card_id : Int) {
                  gps_data(where: {card_id: {_eq: $card_id}}) {
                    card_id
                    data
             }
}

`
export default ({card}) => {

    const [dataa, setData] = useState([]);

    useEffect(() => {
        setData(_generateRandomData());
    }, []);


    const _generateRandomData = () => {
        const data = [];

        for (let i = 0; i < 24; i++) {
            const date = new Date();
            date.setDate(i);

            const d = {
                x: date,
                y: Math.random() * 20,
            };

            data.push(d);
        }

        return data;
    };

    return <div>

    <Query query={GET_EXTRA} variables={{card_id : card.id}} >
        {({ loading, error, data, refetch  }) => {

            if (loading || !data) return null

            if (!data.gps_data.length) return <span>no data</span>

            return <Fragment>
                <LineChart
                    data={dataa}
                    dimension={{
                        height: 400,
                    }}
                    xAxis={{
                        format: undefined
                    }}
                    yAxis={{
                        format: d => d3.format('.2f')(d)
                    }}
                    color="#ec407a"
                />
            </Fragment>

        }}

    </Query>

</div>}
