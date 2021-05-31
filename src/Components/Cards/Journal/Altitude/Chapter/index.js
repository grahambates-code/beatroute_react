import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Deck from "../../../Common/Deck";


gsap.registerPlugin(ScrollTrigger);

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            slideIndex : 0,
            selectedAsset   : null,
            viewState       : props.slide.camera
        }

    }

    render() {

        let {selectedAsset, slideIndex, viewState, slidePhotoRotation} = this.state;

        let {client, slide} = this.props;

        let setViewState            = (p) => this.setState({viewState           : p});

        let props = this.props;

        return  <div>

                {true && <div refetch={props.refetch}>
                        <Deck slide={slide}   client={client} slideIndex={slideIndex} refetch={props.refetch} viewState={viewState} setViewState={setViewState} width={props.width}  trip={props.trip} card={props.card} />
                    </div>
                        }
                    }
                </div> }

}
