import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
}`

gsap.registerPlugin(ScrollTrigger);

// const lineData = parseToLineData(SampleData);
// const range = Math.floor(lineData.length / 3);


const TopScrollGraphic = ({card, width, refetch}) => {
    // const [scatterData, setScatterData] = useState(lineData[0]);
    const [chapterDataArr, setChapterDataArr] = useState([]);
    const brushFocusRef = useRef(null);
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

                    // setScatterData(lineData[index * range + distance]);
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
    
                                                // setChapterDataArr(subData);
                                                console.log('focus', subData);
                                            }
                                        }}
                                    >
                                        <LineScatter
                                            data={lineData[100]}
                                            color="#2196f3"
                                            radius={7}
                                        />
                                    </LineBrush>
                                </ConnectCharts>
                            );
                        }}
                    </Query>
                </div>
            </div>

            <AddChapter card={card} refetch={refetch} data={[1,2,3]}/>

            <pre>{card.slides.length}</pre>

            <div className="top-scroll-graphic-content">
                {false && card.slides.map((s, i) => (
                    <div className="top-scroll-graphic-card">
                        <Chapter
                            key={i}
                            // selectedLongLat={{
                            //     long: scatterData.y,
                            //     lat: scatterData.x
                            // }}
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
