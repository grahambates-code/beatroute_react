import React, { Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Deck from '../../../Common/Deck';

import './index.less';

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
                end: 'bottom+=-40 center+=-16',
                scrub: true,
                pinSpacing: 'margin',
                pin: this.ref.current.querySelector('.chapter-deck'),
                refreshPriority: 0,
            }
        });

        gsap.utils
            .toArray(this.ref.current.querySelectorAll('.chapter-description-wrapper'))
            .forEach((el, i) => {
                tl.fromTo(el, { alpha: 0 }, { alpha: 1 });
                tl.to(el, { alpha: 0, y: '-50%' });
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
                    <div className="chapter-descriptions">
                        <div className="chapter-description-wrapper">
                            <h6>Description 1 testsetest</h6>
                        </div>
                        <div className="chapter-description-wrapper">
                            <h6>Description 2 aaaa</h6>
                        </div>
                        <div className="chapter-description-wrapper">
                            <h6>Description 3 bhnnhnhnhn</h6>
                        </div>
                    </div>
                </div>
            </div>
        );

    }


}
