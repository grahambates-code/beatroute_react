import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SampleData from './sample-data.json';
import { parseToLineData } from './chart.utils';

import ConnectCharts from '../../../../Charts/ConnectCharts';
import LineChart from '../../../../Charts/LineChart';
import LineBrush from '../../../../Charts/LineBrush';
import AxisX from '../../../../Charts/AxisX';
import AxisY from '../../../../Charts/AxisY';
import LineMagnifyingView from '../../../../Charts/LineMagnifyingView';
import LineScatter from '../../../../Charts/LineScatter';
import Chapter from './../Chapter'
import AddChapter from './../AddChapter'

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

const TopScrollGraphic = ({card, width, refetch}) => {
    const [scatterData, setScatterData] = useState(lineData[0]);
    const ref = useRef(null);

    console.log('card', card);

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
                        {({ loading, error, data  }) => {

                            if (loading || !data || !data.gps_data.length) return null

                            //return <pre>{JSON.stringify((data.gps_data[0].data))}</pre>
                            return   <ConnectCharts>
                                        <LineChart
                                            height={300}
                                            data={parseToLineData(data.gps_data[0].data)}
                                            color="#ec407a"
                                        >

                                            <AxisY />
                                            <LineScatter
                                                data={parseToLineData(data.gps_data[0].data)}
                                                color="#2196f3"
                                                radius={7}
                                            />
                                            <LineMagnifyingView />
                                        </LineChart>
                                        <LineBrush
                                            height={100}
                                            data={parseToLineData(data.gps_data[0].data)}
                                            color="#ec407a"
                                        />
                                    </ConnectCharts>

                        }}
                    </Query>
                </div>
            </div>

            <AddChapter card={card} refetch={refetch}/>

            <pre>{card.slides.length}</pre>

            <div className="top-scroll-graphic-content">
                {false && card.slides.map((s, i) => (
                    <div className="top-scroll-graphic-card">
                        <Chapter
                            key={i}
                            selectedLongLat={{
                                long: scatterData.y,
                                lat: scatterData.x
                            }}
                            width={width}
                            slide={s}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopScrollGraphic;
