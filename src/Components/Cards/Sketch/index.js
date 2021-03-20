import React, {Component, useLayoutEffect, useRef, useState} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardSaver from "./../../Saver";
import Procedural from './Procedural'
import Label from './Label'

import './index.less';
import Deck from "./Deck";
import Slides from "../../Carousel";

gsap.registerPlugin(ScrollTrigger);

const defaultThing = {rotation : 0, scale : 100, position : {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        -3.061065673828125,
                        54.482804559582554
                    ]
                }
            }
       };

export default class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            canvas : null,
            slideIndex :0,
            slidePhotoRotation : null,
            viewState : props.card.slides[0].camera ? props.card.slides[0]?.camera : {longitude : 0, latitude : 50, zoom : 4 },
            currentPhoto : props.card.slides[0]?.data?.geojson
        }

    }

    //this should be updated to slidePhotoRotation..it did kind of work
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {slideIndex} = this.state;

        if (prevState.slideIndex !== slideIndex) {
           // this.setState({ slidePhotoRotation : this.props.card.slides[slideIndex]?.data?.pointB});
        }

    }

    render() {

        let {currentPhoto, slideIndex, viewState, slidePhotoRotation, canvas} = this.state;
        let {client} = this.props;

        let setCurrentPhoto         = (p) => this.setState({currentPhoto : p});
        let setSlideIndex           = (p) => this.setState({slideIndex   : p});
        let setViewState            = (p) => this.setState({viewState    : p});
        let setSlidePhotoRotation   = (p) => this.setState({slidePhotoRotation    : p});
        //let setCanvas               = (p) => this.setState({canvas    : p});

        let props = this.props;

        //let canvas2 = (canvas?.current.el.getElementsByTagName('canvas')[0])

        return <div className="sketch-card">
                    <div>

                        <Label card={props.card}/>

                        <Procedural location={{animationDuration : 10, longitude: 7.698941573782926, latitude: 45.74338484004915, height: 2183.358398660126, angle: 36.11883143607126, bearing: 70.35532994923864}}/>

                        {true && <CardSaver refetch={props.refetch}>

                            {
                                (updateSlide, updateMap, updateTable, updateAnnotation, updateLandscape, updateSlideMedia, loading, error) => {
                                    return <div>



                                        <Deck  slidePhotoRotation={slidePhotoRotation} setSlidePhotoRotation={setSlidePhotoRotation} client={client} setCurrentPhoto={setCurrentPhoto} currentPhoto={currentPhoto} slideIndex={slideIndex} refetch={props.refetch} viewState={viewState} setViewState={setViewState} width={props.width} updateSlide={updateSlide} updateSlideMedia={updateSlideMedia} updateMap={updateMap} updateAnnotation={updateAnnotation} trip={props.trip} card={props.card} />

                                        <Slides slidePhotoRotation={slidePhotoRotation} setSlidePhotoRotation={setSlidePhotoRotation} setCurrentPhoto={setCurrentPhoto} slideIndex={slideIndex} setSlideIndex={setSlideIndex} viewState={viewState}  setViewState={setViewState} refetch={props.refetch} card={props.card}/>

                                    </div>
                                }
                            }
                        </CardSaver> }

                    </div>
                </div>
    }
}

