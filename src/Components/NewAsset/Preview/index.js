import React, {Fragment, useState} from 'react';
import DeckGL from '@deck.gl/react';
import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import {MapController, LinearInterpolator, FlyToInterpolator} from '@deck.gl/core';
import {Component} from 'react';
import _ from "lodash";
import { Dialog, DialogContent, DialogTitle, Input, Box, DialogActions, Button, TextField, Grid } from '@material-ui/core';


import {AmbientLight, PointLight, DirectionalLight, LightingEffect} from '@deck.gl/core';
import {ScenegraphLayer} from "@deck.gl/mesh-layers";

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

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {viewState : {zoom : 15,longitude : 5, latitude : 5}};
    }

    render() {

        return (
            <div  style={{position : 'relative', height : '200px', width : '350px', marginBottom : '20px' }}>

        <DeckGL

                viewState={this.state.viewState}
                controller={true}
                height="100%"
                width="100%"
                effects={[lightingEffect]}
                ref={deck => {
                    this.deckGL = deck;
                }}

                onAfterRender={ () => {
                    if (this.deckGL && this.deckGL.deck) {
                        this.props.setThumbnail(this.deckGL.deck.canvas.toDataURL());
                    }
                }}
                onViewStateChange={({viewId, viewState}) => {
                    this.setState({viewState});
                }
                }

                layers={

                    [

                        new ScenegraphLayer({ data : [1],

                            scenegraph : this.props.path,

                            opacity : 1,

                            getPosition: asset => [5,5],

                            getOrientation: asset => [0, 0, 90 ],

                            sizeScale: 10,

                            _lighting: 'pbr'
                        })

                      ]
                }/></div>
        );
    }
}
