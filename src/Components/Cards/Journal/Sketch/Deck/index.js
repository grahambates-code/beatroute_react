import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import {Component} from 'react';
import _ from "lodash";
import './index.less';

import JournalMap from './layers';

import {AmbientLight, PointLight, DirectionalLight, LightingEffect} from '@deck.gl/core';

const cl = new DirectionalLight({
    color: [255, 255, 255],
    direction: [1, 1, -1],
    intensity: 0.8
});

const cl2 = new DirectionalLight({
    color: [255, 255, 255],
    direction: [1, 1, -1],
    intensity: 0.8
});

// create ambient light source
const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1
});

const lightingEffect = new LightingEffect({  cl2});


const emptyFeatureCollection = {
    "type": "FeatureCollection",
    "features": [

    ]
}

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

        const slide = this.props.card.slides[this.props.slideIndex];

        let layers = [
           new JournalMap({ selectedAsset : slide.assets[0], slide : slide, refetch : this.props.refetch, client : this.props.client, trip : this.props.trip, width : this.props.width, data : this.props.card.data || emptyFeatureCollection}),
        ];

        let that = this;

        class Controller extends MapController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {

                    const slide = that.props.card.slides[that.props.slideIndex];
                    that.debounce(() => that.props.updateSlide({variables : {slide_id : slide.id,  data :  {...slide.data, pointB : that.props.slidePhotoRotation}, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        let controller = Controller;

        return (
            <div>

                <div className="Deck" >

                    <div className="poster">
                        <DeckGL

                            viewState={this.props.viewState}
                            //controller={true}
                            controller={{type: controller, inertia: true, touchRotate : true, dragRotate : true, scrollZoom: true, doubleClickZoom : false}}
                           // _animate={true}
                            height="100%"
                            width="100%"
                            effects={[lightingEffect]}
                            ref={deck => {
                                this.deckGL = deck;
                            }}

                            onViewStateChange={({viewId, viewState}) => {
                                    this.props.setViewState(viewState);
                            }
                            }

                            layers={layers}/>
                    </div>

                </div>

            </div>
        );
    }
}
