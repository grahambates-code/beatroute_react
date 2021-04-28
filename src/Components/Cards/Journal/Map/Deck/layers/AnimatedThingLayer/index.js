import React from 'react';
import * as turf from '@turf/turf/index';
import { CompositeLayer } from '@deck.gl/core';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';
import rough from 'roughjs/bundled/rough.esm';

const seed = rough.newSeed();

class CanvasDisplay {
    constructor() {
        this.canvas = document.createElement('canvas');

        this.ctx = this.canvas.getContext('2d');
        this.x = 0;

        this.stageConfig = {
            width: 5000,
            height: 5000,
        };

        this.canvas.width = this.stageConfig.width;
        this.canvas.height = this.stageConfig.height;

        this.rc = rough.canvas(this.canvas);

        const that = this;

        this.rc.ellipse(2500, 2500, 2500, 2000, {
            roughness: 2.8,
            strokeWidth: 100,
            stroke: 'black',
            seed,
        });
    }
}

let canvasDisplay = new CanvasDisplay();

class SketchDeck extends BitmapLayer {
    constructor(props) {
        const center = turf.point(props.center);

        var radius = 1000;
        var options = { units: 'meters' };
        var circle = turf.circle(center, radius, options);

        const [left, bottom, right, top] = turf.bbox(circle);

        const params = {
            id: 'bitmap-layer4',
            bounds: [
                [left, bottom],
                [left, top],
                [right, top],
                [right, bottom],
            ],
            image: canvasDisplay.canvas,

            parameters: {
                depthTest: false,
            },
        };

        super(params);
    }
}

export default class Animated extends CompositeLayer {
    initializeState() {}

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const sketch = new SketchDeck({ center: this.props.center });

        return [sketch];
    }
}

Animated.layerName = 'AnimatedLayer';
