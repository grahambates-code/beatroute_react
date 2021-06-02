import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Chapter from '../Chapter'
import AddChapter from '../AddChapter'
import AltitudeChartHeader from './AltitudeChartHeader';
import * as turf from '@turf/turf'
import './index.css';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const AltitudeChart = ({font, card, width, refetch, updateSlideCamera, gps_data}) => {
    const [chapterDataSet, setChapterDataSet] = useState([]);
    // const [scatterData, setScatterData] = useState(lineData[0]);
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
                    <AltitudeChartHeader
                        card={card}
                        refetch={refetch}
                        onSelection={(subData) => {
                            if (subData.length > 2) {
                                var line = turf.lineString(subData);
                                var bbox = turf.bbox(line);
                                var bboxPolygon = turf.bboxPolygon(bbox);

                                setChapterDataSet(bboxPolygon);
                            }

                        }}
                    />
                </div>
            </div>

            <div className="top-scroll-graphic-content">
                {card.slides.map((s, i) => (
                    <div className="top-scroll-graphic-card">
                        <Chapter
                            key={i}
                            font={font}
                            card={card}
                            gps_data={gps_data}
                            updateSlideCamera={updateSlideCamera}
                            width={width}
                            slide={s}
                        />
                    </div>
                ))}
            </div>

            <AddChapter card={card} refetch={refetch} data={chapterDataSet}/>

        </div>
    );
};

export default AltitudeChart;
