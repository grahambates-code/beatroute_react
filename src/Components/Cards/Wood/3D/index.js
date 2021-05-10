import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import {MapController} from '@deck.gl/core';
import {OrbitView, COORDINATE_SYSTEM} from '@deck.gl/core';
import {SimpleMeshLayer} from '@deck.gl/mesh-layers';
import {Component} from 'react';
import _ from "lodash";
import {CubeGeometry, SphereGeometry} from '@luma.gl/engine';

import {brightnessContrast, dotScreen} from '@luma.gl/shadertools';
import {PostProcessEffect} from '@deck.gl/core';
import {ScenegraphLayer} from "@deck.gl/mesh-layers";

import {AmbientLight, DirectionalLight, LightingEffect} from '@deck.gl/core';
import { Slider} from '@material-ui/core';

const postProcessEffect = new PostProcessEffect(dotScreen, {});

const data = [
    {position: [0, 0, 0], color: [255, 128, 128]},
];

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            intensity : 4,
            position_x : 0,
            position_y : 5,
            position_z : 5,
            viewState: {target: [0, 0, 0], rotationX: 0, rotationOrbit: 90, zoom: 5},
        };
        this.debounce  = _.debounce(e => e(), 300);
    }

    render() {

        class Controller extends MapController {

            constructor(props) {
                super(props);
            }

            handleEvent(event) {

                super.handleEvent(event);

                if ((event.type === 'panend' || event.type === 'wheel' )) {

                   // const slide = that.props.card.slides[that.props.slideIndex];
                   // that.debounce(() => that.props.updateSlide({variables : {slide_id : slide.id,  data :  {...slide.data, pointB : that.props.slidePhotoRotation}, camera : this.controllerState._viewportProps}}));
                }
            }
        }

        const cl2 = new DirectionalLight({
            color: [255, 0, 0],
            direction: [this.state.position_x, this.state.position_y, this.state.position_z],
            intensity: this.state.intensity
        });

// create ambient light source
        const ambientLight = new AmbientLight({
            color: [255, 255, 255],
            intensity: 0.2
        });

        const lightingEffect = new LightingEffect({ ambientLight, cl2});

        return (
            <div>

                <Slider
                    value={this.state.position_x}
                    min={-10}
                    step={0.1}
                    max={10}
                    onChange={(_, e) => {
                        this.setState({position_x : e})
                    }}
                />

                <Slider
                    value={this.state.position_y}
                    min={-10}
                    step={0.1}
                    max={10}
                    onChange={(_, e) => {
                        this.setState({position_y : e})
                    }}
                />


                <Slider
                    value={this.state.position_z}
                    min={-10}
                    step={0.1}
                    max={10}
                    onChange={(_, e) => {
                        this.setState({position_z : e})
                    }}
                />

                <Slider
                    value={this.state.intensity}
                    min={0}
                    step={0.1}
                    max={10}
                    onChange={(_, e) => {
                        this.setState({intensity : e})
                    }}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                />

                <div className="Deck" >

                    <div className="poster">
                        <DeckGL

                            viewState={this.state.viewState}
                            views={[new OrbitView({fov: 30})]}
                            controller={true}
                            height="100%"
                            width="100%"
                            effects={[postProcessEffect, lightingEffect]}
                            ref={deck => {
                                this.deckGL = deck;
                            }}

                            onViewStateChange={({viewId, viewState}) => {
                                this.setState({viewState});
                            }
                            }

                            layers={
                                [

                                    new ScenegraphLayer({ data,

                                        scenegraph : 'models/venus.glb',

                                        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,

                                        opacity : 1,

                                        material: {
                                            ambient: 0.2,
                                            diffuse: 0.8
                                        },
                                        getPosition: d => d.position,
                                        //getColor: d => d.color,
                                        getScale: [3, 3, 3],

                                        getOrientation: asset => [0, 0, 90 ],

                                        sizeScale: 10,

                                        _lighting: 'pbr'
                                    })

                                ]
                            }/>
                    </div>

                </div>

            </div>
        );
    }
}
