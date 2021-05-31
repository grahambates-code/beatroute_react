import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SampleData from './sample-data.json';
import { parseToLineData } from './chart.utils';

import Chapter from './../Chapter'

import LineChart from '../libs/charts/LineChart';
import AxisX from '../libs/charts/AxisX';
import AxisY from '../libs/charts/AxisY';
import LineScatter from '../libs/charts/LineScatter';

import './index.css';
import {Query} from "react-apollo";
import gql from "graphql-tag";


const GET_EXTRA = gql`
             query MyQuery($card_id : Int) {
                  gps_data(where: {card_id: {_eq: $card_id}}) {
                    card_id
                    data
             }
}

`

gsap.registerPlugin(ScrollTrigger);

const lineData = parseToLineData(SampleData);
const range = Math.floor(lineData.length / 3);

const TopScrollGraphic = ({card, width}) => {
    const [scatterData, setScatterData] = useState(lineData[0]);
    const ref = useRef(null);

    useLayoutEffect(() => {
        const scrollers = [];
        const allCardElements = ref.current.querySelectorAll('.top-scroll-graphic-card');

        const fadeAllCards = () => {
            gsap.to('.top-scroll-graphic-card', { alpha: 0.2 });
        };

        gsap.utils.toArray(allCardElements).forEach((el, index) => {
            const scroller = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                refreshPriority: 0,
                onEnter: () => {
                    fadeAllCards();
                    gsap.to(el, { alpha: 1 });
                },
                onEnterBack: () => {
                    fadeAllCards();
                    gsap.to(el, { alpha: 1 });
                },
                onUpdate: ({ progress }) => {
                    const distance = Math.floor(progress * 10);

                    setScatterData(lineData[index * range + distance]);
                },
            });

            scrollers.push(scroller);
        });

        return () => {
            scrollers.forEach((scroller) => {
                scroller.kill();
            });
        };
    }, []);

    return (
        <div ref={ref} className="top-scroll-graphic">
            <div className="top-scroll-graphic-header">
                <div>

                    <Query query={GET_EXTRA} variables={{card_id : card.id}} >
                        {({ loading, error, data, refetch  }) => {

                            if (loading || !data || !data.gps_data.length) return null


                          //  return <pre>{JSON.stringify(data.gps_data[0].data)}</pre>
                            return <LineChart
                                height={300}
                                data={parseToLineData(data.gps_data[0].data)}
                                color="#ec407a"
                            >

                                <AxisY/>
                                <LineScatter
                                    data={scatterData}
                                    color="#2196f3"
                                    radius={7}
                                />
                            </LineChart>
                        }}
                    </Query>

                </div>
            </div>

            <pre>selectedLongLat</pre>

            <div className="top-scroll-graphic-content">
                {card.slides.map(s => <Chapter selectedLongLat={'selectedLongLat'} width={width} slide={s} />)}
            </div>
        </div>
    );
};

export default TopScrollGraphic;
