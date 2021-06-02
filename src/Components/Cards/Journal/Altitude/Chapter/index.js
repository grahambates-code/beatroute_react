import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Deck from "../../../Common/Deck";

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            slideIndex: 0,
            selectedAsset: null,
            viewState: props.slide.camera
        }

    }

    render() {

        let { viewState } = this.state;

        let {font, client, slide, refetch, width, trip, card, updateSlideCamera, gps_data} = this.props;

        let setViewState = (p) => this.setState({viewState: p});

        return <Deck slide={slide}
                     client={client}
                     refetch={refetch}
                     updateSlideCamera={updateSlideCamera}
                     font={font}
                     viewState={viewState}
                     setViewState={setViewState}
                     width={width}
                     trip={trip}
                     gps_data={gps_data}
                     card={card}/>

    }


}
