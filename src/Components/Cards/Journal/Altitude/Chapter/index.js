import React, { Component } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconButton, Tooltip } from '@material-ui/core';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';

import Deck from '../../../Common/Deck';
import PhotoLookup from './../PhotoLookup';

import './index.less';

gsap.registerPlugin(ScrollTrigger);

export default class Chapter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            selectedAsset: null,
            viewState: props.chapter.camera,
            interactiveMap: false,
        }
        this.ref = React.createRef(null);
    }

    componentDidMount() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.ref.current,
                start: 'top top+=260',
                end: "+=" + (window.innerHeight * 3),
                anticipatePin: true,
                // end: 'bottom+=-40 center+=-16',
                scrub: true,
                pinSpacing: 'margin',
                pin: this.ref.current.querySelector('.chapter-deck'),
                refreshPriority: 0,
            }
        });

        gsap.utils
            .toArray(this.ref.current.querySelectorAll('.chapter-description-wrapper'))
            .forEach((el, i) => {
                tl.fromTo(
                    el,
                    { alpha: 0, y: 128 },
                    {
                        alpha: 1,
                        y: 0,
                        onReverseComplete: () => {
                            if (this.props.onDescriptionEnter) {
                                this.props.onDescriptionEnter(i);
                            }
                        },
                        onComplete: () => {
                            if (this.props.onDescriptionEnter) {
                                this.props.onDescriptionEnter(i);
                            }
                        },
                    });
                tl.to(el, { alpha: 0 });
            });

        // tl.duration(10)
    }

    setViewState = (p) => {
        this.setState({viewState: p});
    };

    handleToggleMapInteraction = () => {
        const interactiveMap = !this.state.interactiveMap;
        this.setState({ interactiveMap });

    };

    render() {
        let { viewState } = this.state;
        let { font, client, chapter, refetch, width, trip, card, updateSlideCamera, gps_data } = this.props;

        return (
            <div ref={this.ref} className="chapter">
                <div className="chapter-deck">
                    <div className="chapter-btn">
                        <Tooltip placement="top" title={`${this.state.interactiveMap ? 'Enabled' : 'Disabled'} the map`}>
                            <IconButton color={this.state.interactiveMap ? 'primary' : 'default'} onClick={this.handleToggleMapInteraction}>
                                <PublicOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div style={{ zIndex: this.state.interactiveMap ? 9 : 0 }}>
                        <PhotoLookup viewState={chapter.camera}>
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
                    <div className="chapter-descriptions" style={{ pointerEvents: this.state.interactiveMap ? 'none' : 'auto'}}>
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
