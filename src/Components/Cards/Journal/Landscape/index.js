import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Landscape from '../../../Landscape';
import * as portals from 'react-reverse-portal';

gsap.registerPlugin(ScrollTrigger);

function Index(props) {
    const [inViewport, setInViewport] = useState(false);
    const ref = useRef();

    useEffect(() => {
        ScrollTrigger.create({
            trigger: ref.current,
            start: 'top center',
            onEnter: () => {
                setInViewport(true);
                console.log('onEnter');
            },
            onEnterBack: () => {
                setInViewport(true);
            },
            onLeave: () => {
                setInViewport(false);
                console.log('Leave');
            },
            onLeaveBack: () => {
                setInViewport(false);
            },
            scrub: 1,
        });
    }, []);

    return (
        <div style={{ height: '400px' }}>
            <div>test</div>
            {true && <portals.OutPortal node={props.portalNode} />}
            <div>test2</div>
        </div>
    );
}

export default Index;
