import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {GeoJsonLayer} from '@deck.gl/layers';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {TextLayer} from '@deck.gl/layers';
import {Component} from 'react';
import _ from "lodash";
import './index.less';

import CustomPathLayer  from './layers/CustomPathLayer'
import AnimatedThingLayer  from './layers/AnimatedThingLayer'

import { EditableGeoJsonLayer, TransformMode, TranslateMode } from "nebula.gl";
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {CubeGeometry} from '@luma.gl/core'

import AssetLayer from './layers/AssetLayer';
import EditLayer from './layers/EditLayer';

import {OBJLoader} from '@loaders.gl/obj';

import {bbox}  from '@turf/turf'
import gql from "graphql-tag";
import {AmbientLight, PointLight, DirectionalLight, LightingEffect} from '@deck.gl/core';

import {_CameraLight as CameraLight} from '@deck.gl/core';

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
    intensity: 0.4
});

const lightingEffect = new LightingEffect({ cl, cl2, ambientLight});


const emptyFeatureCollection = {
    "type": "FeatureCollection",
    "features": [

    ]
}

// const SAVE_SLIDE_DATA = gql`
//
//     mutation( $slide_id : Int,  $data : jsonb){
//                     update_card_slide(where: {id: {_eq: $slide_id}}, _set: { data: $data}) {
//                         returning {
//                                     id
//                                   }
//     }
//     }
// `;

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {editingAsset : null};
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

        const slide = this.props.card.slides[this.props.slideIndex];

        //console.log( this.state.editingAsset);

        let layers = [

            new TileLayer({
                id: 'TileLayer',
                data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                tileSize: 256,

                renderSubLayers: props => {
                    const {
                        bbox: {west, south, east, north}
                    } = props.tile;

                    return new BitmapLayer(props, {
                        data: null,
                        desaturate : 1,
                        image: props.data,
                        bounds: [west, south, east, north]
                    });
                },
               // pickable: true,
            }),

            new GeoJsonLayer({
                id: 'route-layer',
                data : this.props.card.data || emptyFeatureCollection,
                lineWidthScale: 1,
                lineWidthMinPixels: 8,
                lineWidthMaxPixels: 14,
                getLineColor: [255, 238,100, 255],
                getRadius: 100,
                getLineWidth: 10,
                //modelMatrix : new Matrix4().makeTranslation(0,0,10 ),

                _subLayerProps: {
                    "line-strings": {type: CustomPathLayer},
                }

            }),

           slide.assets.map((a, i) => new AssetLayer({ id : 'fgfdgfd' + i, onClick: () => { this.setState({editingAsset : a})}, scenegraph: a.type, asset : a})),

           this.state.editingAsset && new EditLayer({refetch : this.props.refetch, client : this.props.client, asset : this.state.editingAsset}),

            false &&  new SimpleMeshLayer({
                id: 'mesh-layer',
               data: [
                   {
                       "name": "Lafayette (LAFY)",
                       "code": "LF",
                       "address": "3601 Deer Hill Road, Lafayette CA 94549",
                       "entries": "3481",
                       "exits": "3616",
                       "coordinates": [
                           -2.9878563941855183,54.51836319674894
                       ]
                   }
               ],
               mesh: '/textures/paper2.obj',
               sizeScale: 100,
               texture: '/textures/looking.jpg',
               getColor: d => [10, 140, 222],
               getPosition: d => d.coordinates,
                getTranslation : [0,0,100],
               loaders: [OBJLoader],

                //getColor: d => d.color,
                getOrientation: d => [0, 190, 90]
            }),

            ///new AnimatedThingLayer({center : [ -2.978496551513672, 54.533135289883056 ]}),

            new TextLayer({
                id: 'text-layer',
                data : [1],
                pickable: true,
                getPosition: d => [ -2.978496551513672, 54.533135289883056 ],
                getText: d => 'A fun day out',
                getSize: 40,
                sizeUnits : 'meters',
                getAngle: 32,
                billboard : false,
                getTextAnchor: 'middle',
                fontFamily : 'DJB Sand Shoes and a Fez',
                getAlignmentBaseline: 'center'
            })

            ];

        let that = this;

        class Controller extends MapController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);
                //console.log(event.type);
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
                            _animate={true}
                            height="100%"
                            width="100%"
                            effects={[lightingEffect]}
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

            </div>
        );
    }
}
