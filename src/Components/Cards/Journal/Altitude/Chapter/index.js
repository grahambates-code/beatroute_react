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
            viewState: props.slide.camera
        }
    }

    componentDidMount() {
        //TODO: Handle GSAP here
    }

    setViewState = (p) => {
        this.setState({viewState: p});
    };

    render() {
        let { viewState } = this.state;
        let { font, client, slide, refetch, width, trip, card, updateSlideCamera, gps_data } = this.props;

        return (
            <div className="chapter">
                <Deck 
                    slide={slide}
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
                        <p>Description 1</p>
                    </div>
                    <div className="chapter-description-wrapper">
                        <p>Description 2</p>
                    </div>
                    <div className="chapter-description-wrapper">
                        <p>Description 3</p>
                    </div>
                </div>
            </div>
        );

    }


}
