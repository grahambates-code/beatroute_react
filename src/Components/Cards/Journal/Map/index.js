import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Deck from "./Deck";
import CardSaver from "../../../Saver";
import Toolbar from '../Toolbar'
import Slides from "./Slides";

import './index.less';
import Overlay from "../../Common/Overlay";
import {Button} from "../Toolbar/Button";
import DeleteCard from "../Toolbar/DeleteCard";
import AddAsset from "../Toolbar/AddAsset";
import Frame from "../../Common/Frame";

gsap.registerPlugin(ScrollTrigger);

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            slideIndex : 0,
            selectedAsset   : null,
            viewState       : props.card.slides[0].camera ? props.card.slides[0]?.camera : {longitude : 0, latitude : 50, zoom : 4 }
        }

    }

    render() {

        let {selectedAsset, slideIndex, viewState, slidePhotoRotation} = this.state;

        let {client, font, card, refetch} = this.props;

        let setViewState            = (p) => this.setState({viewState           : p});
        let setSelectedAsset        = (p) => this.setState({selectedAsset       : p});
        let setSlidePhotoRotation   = (p) => this.setState({slidePhotoRotation  : p});
        let setSlideIndex           = (p) => this.setState({slideIndex          : p});

        let props = this.props;

        let slide = props.card.slides[0];

        const actions = [
            { icon: <DeleteCard refetch={refetch} card={card}/>, name: 'Delete' },
            { icon: <AddAsset refetch={refetch} card={card}/>, name: 'Add annotation' },
        ];

        return <Overlay card={props.card} button={<Button actions={actions}/>}> <div className="sketch-card">
                    <div>

                        {true && <CardSaver refetch={props.refetch}>

                            {
                                (updateSlide, updateMap, updateTable, updateAnnotation, updateLandscape, updateSlideMedia, loading, error) => {
                                    return <div>

                                        {/*<Procedural location={{animationDuration : 10, longitude: 7.698941573782926, latitude: 45.74338484004915, height: 2183.358398660126, angle: 36.11883143607126, bearing: 70.35532994923864}}/>*/}

                                        <Deck font={font} slide={slide} setSelectedAsset={setSelectedAsset} selectedAsset={selectedAsset} client={client} slideIndex={slideIndex} refetch={props.refetch} viewState={viewState} setViewState={setViewState} width={props.width} updateSlide={updateSlide} updateSlideMedia={updateSlideMedia} updateMap={updateMap} updateAnnotation={updateAnnotation} trip={props.trip} card={props.card} />

                                        <Slides updateSlide={updateSlide} slideIndex={slideIndex} setSlideIndex={setSlideIndex} card={props.card} viewState={viewState}  setViewState={setViewState}/>

                                        <Toolbar slide={slide} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} refetch={props.refetch} viewState={viewState} setViewState={setViewState} />

                                    </div>
                                }
                            }
                        </CardSaver> }

                    </div>
                </div>  </Overlay>
    }
}

