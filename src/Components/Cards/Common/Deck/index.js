import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import {Component} from 'react';
import {BitmapLayer, GeoJsonLayer} from '@deck.gl/layers';
import _ from "lodash";
import './index.less';
import {AmbientLight, PointLight, DirectionalLight, LightingEffect} from '@deck.gl/core';
import MVTLayer from "./layers/MVT";
import CustomPathLayer from "./layers/CustomPathLayer";

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

        const mvtLayer = new MVTLayer({
            data: `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw`,


            renderSubLayers: (props) => {

                return [
                    new GeoJsonLayer({
                        ...props,
                        data : props.data.filter(d => d.geometry.type === 'LineString'),
                        //id: `${props.id}_point`,
                        visible: true,
                        getLineColor: [255, 127, 0, 100],
                        lineWidthScale: 10,
                        lineWidthMinPixels: 4,
                        getRadius: 5,
                        getLineWidth: 1,
                        _subLayerProps: {
                            "line-strings": {type: CustomPathLayer},
                        }
                    })
                ]
            }
        });



        let layers = [
          // new JournalMap({ media : [], font : this.props.font, selectedAsset : null, slide : slide, refetch : this.props.refetch, client : this.props.client, trip : this.props.trip, width : this.props.width, data : gps_data || emptyFeatureCollection}),
            mvtLayer
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
                    test
                    <DeckGL

                        viewState={this.props.viewState}
                        //controller={{type: controller, inertia: true, touchRotate : true, dragRotate : true, scrollZoom: true, doubleClickZoom : false}}
                        controller={true}
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
