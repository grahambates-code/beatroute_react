import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SampleData from './sample-data.json';
import { parseToLineData } from './chart.utils';

import LineChart from '../libs/charts/LineChart';
import AxisX from '../libs/charts/AxisX';
import AxisY from '../libs/charts/AxisY';
import LineScatter from '../libs/charts/LineScatter';

import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const lineData = parseToLineData(SampleData);
const range = Math.floor(lineData.length / 3);

const TopScrollGraphic = () => {
    const [scatterData, setScatterData] = useState(lineData[0]);
    const ref = useRef(null);

    useLayoutEffect(() => {
        const scrollers = [];

        // const headerScroll = ScrollTrigger.create({
        //     trigger: ref.current,
        //     pin: ref.current.querySelector('.top-scroll-graphic-header'),
        //     pinSpacing: false,
        //     start: 'top top',
        //     end: 'bottom center',
        //     scrub: true,
        //     refreshPriority: 0
        // });

        // scrollers.push(headerScroll);

        gsap.utils.toArray(ref.current.querySelectorAll('.top-scroll-graphic-card')).forEach((el, index) => {
            const scroller = ScrollTrigger.create({
                trigger: el,
                start: 'top center',
                end: 'bottom center',
                refreshPriority: 0,
                onUpdate: ({ progress }) => {
                    let distance = 0;

                    if (progress >= 0.25 && progress <= 0.75) {
                        distance = 3;
                    }

                    if (progress > 0.75) {
                        distance = 6;
                    }

                    setScatterData(lineData[index * range + distance]);
                }
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
                    </LineChart>
                </div>
            </div>
            <div className="top-scroll-graphic-content">
                <article className="top-scroll-graphic-card">
                    <figure>
                        <img src="https://i.pinimg.com/originals/21/d3/51/21d3519583bc875eab677721609cebda.jpg" alt="img" />
                    </figure>
                    <div>
                        <h3>What is Lorem Ipsum?</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </article>
                <article className="top-scroll-graphic-card">
                    <div>
                        <h3>Where does it come from?</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                    <figure>
                        <img src="https://www.wallpaperflare.com/static/755/594/343/firewatch-video-games-landscape-pine-wallpaper.jpg" alt="img" />
                    </figure>
                </article>
                <article className="top-scroll-graphic-card">
                    <figure>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdyn2S8fsIvUlFJdUpjBsqE1NW92VpjlndYAW7uPv1PF2ZOTNO9XmDbz6Hl4LcBq05OlM&usqp=CAU" alt="img" />
                    </figure>
                    <div>
                        <h3>Where can I get some?</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default TopScrollGraphic;
