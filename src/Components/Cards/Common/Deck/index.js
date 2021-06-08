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

export default class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

        const {slide, gps_data, media} = this.props;

        // console.log(gps_data);

        let layers = [
           new JournalMap({ media : media, font : this.props.font, selectedAsset : null, slide : slide, refetch : this.props.refetch, client : this.props.client, trip : this.props.trip, width : this.props.width, data : gps_data.data || emptyFeatureCollection}),
        ];

        let that = this;

        class Controller extends MapController {
            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {
                    let chapter = that.props.chapter;
                   // const slide = that.props.card.slides[that.props.slideIndex];
                   that.debounce(() => that.props.updateSlideCamera({variables : {chapter_id : chapter.id, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        let controller = Controller;

        // console.log(this.props.media);

        return (
            <div className="Deck" >

                <div className="poster">
                    <DeckGL

                        viewState={this.props.viewState} controller={{type: controller, inertia: true, touchRotate : true, dragRotate : true, scrollZoom: true, doubleClickZoom : false}}
                        height="100%"
                        width="100%"
                        //effects={[lightingEffect]}
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
        );
    }
}
