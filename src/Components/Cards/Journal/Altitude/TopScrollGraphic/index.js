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

import './index.css';

gsap.registerPlugin(ScrollTrigger);

const lineData = parseToLineData(SampleData);
const range = Math.floor(lineData.length / 3);

const TopScrollGraphic = ({card, width}) => {
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
                    <ConnectCharts>
                        <LineChart
                            height={300}
                            data={lineData}
                            color="#ec407a"
                        >
                            <AxisX />
                            <AxisY />
                            <LineScatter
                                data={scatterData}
                                color="#2196f3"
                                radius={7}
                            />
                            <LineMagnifyingView />
                        </LineChart>
                        <LineBrush 
                            height={100}
                            data={lineData}
                            color="#ec407a"
                        />
                    </ConnectCharts>
                </div>
            </div>

            <pre>selectedLongLat</pre>

            <div className="top-scroll-graphic-content">
                {card.slides.map((s, i) => (
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
