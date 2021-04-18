import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer, TextLayer} from '@deck.gl/layers';

let data = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "id": "GEO",
            "properties": {
                "name": "Georgia"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            41.554084,
                            41.535656
                        ],
                        [
                            41.703171,
                            41.962943
                        ],
                        [
                            41.45347,
                            42.645123
                        ],
                        [
                            40.875469,
                            43.013628
                        ],
                        [
                            40.321394,
                            43.128634
                        ],
                        [
                            39.955009,
                            43.434998
                        ],
                        [
                            40.076965,
                            43.553104
                        ],
                        [
                            40.922185,
                            43.382159
                        ],
                        [
                            42.394395,
                            43.220308
                        ],
                        [
                            43.756017,
                            42.740828
                        ],
                        [
                            43.9312,
                            42.554974
                        ],
                        [
                            44.537623,
                            42.711993
                        ],
                        [
                            45.470279,
                            42.502781
                        ],
                        [
                            45.77641,
                            42.092444
                        ],
                        [
                            46.404951,
                            41.860675
                        ],
                        [
                            46.145432,
                            41.722802
                        ],
                        [
                            46.637908,
                            41.181673
                        ],
                        [
                            46.501637,
                            41.064445
                        ],
                        [
                            45.962601,
                            41.123873
                        ],
                        [
                            45.217426,
                            41.411452
                        ],
                        [
                            44.97248,
                            41.248129
                        ],
                        [
                            43.582746,
                            41.092143
                        ],
                        [
                            42.619549,
                            41.583173
                        ],
                        [
                            41.554084,
                            41.535656
                        ]
                    ]
                ]
            }
        }
    ]
};

export default class HighlightLayer extends CompositeLayer {

    initializeState() {
        let self = this;
        this.setState({});
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {

        const {  bounds} = this.props;

        const layer = new GeoJsonLayer({
            id: 'highlight-layer',
            data,
            pickable: true,
            stroked: true,
            filled: false,
            extruded: false,
            lineWidthScale: 1,
            lineWidthMinPixels: 2,
            getLineColor: d => [0, 0, 0, 200],
            getRadius: 100,
            getLineWidth: 1,
            getElevation: 0
        });

        return [ layer];
    }
}

HighlightLayer.componentName = 'HighlightLayer';
