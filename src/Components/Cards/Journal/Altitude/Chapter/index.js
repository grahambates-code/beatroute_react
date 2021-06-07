import React, { Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Deck from '../../../Common/Deck';

import './index.less';
import PhotoLookup from "../PhotoLookup";

gsap.registerPlugin(ScrollTrigger);

export default class Chapter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            selectedAsset: null,
            viewState: props.chapter.camera
        }
        this.ref = React.createRef(null);
    }

    componentDidMount() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.ref.current,
                start: 'top top+=260',
                end: 'bottom center+=-16',
                scrub: true,
                pinSpacing: false,
                pin: this.ref.current.querySelector('.chapter-deck'),
                refreshPriority: 0,
            }
        });

        gsap.utils.toArray(this.ref.current.querySelectorAll('.chapter-description-wrapper')).forEach((el, i) => {
            tl.fromTo(el, { alpha: 0, y: -20 }, { alpha: 1, y: -40 * (4 - i) });
            tl.to(el, { alpha: 0 });
        });
    }

    setViewState = (p) => {
        this.setState({viewState: p});
    };

    render() {
        let { viewState } = this.state;
        let { font, client, chapter, refetch, width, trip, card, updateSlideCamera, gps_data } = this.props;

        return (
            <div ref={this.ref} className="chapter">
                <div className="chapter-deck">
                    <PhotoLookup viewState={viewState}>

                        <Deck
                            chapter={chapter}
                            client={client}
                            refetch={refetch}
                            updateSlideCamera={updateSlideCamera}
                            font={font}
                            viewState={viewState}
                            setViewState={this.setViewState}
                            width={width}
                            trip={trip}
                            gps_data={gps_data}
                            card={card}
                        />
                    </PhotoLookup>
                </div>
                <div className="chapter-descriptions">
                    <div className="chapter-description-wrapper">
                        <h6>Description 1</h6>
                    </div>
                    <div className="chapter-description-wrapper">
                        <h6>Description 2</h6>
                    </div>
                    <div className="chapter-description-wrapper">
                        <h6>Description 3</h6>
                    </div>
                </div>
            </div>
        );

    }


}
