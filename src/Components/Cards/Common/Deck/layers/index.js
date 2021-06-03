import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import CustomPathLayer from "./CustomPathLayer";
import JournalMaskLayer from "./Masks/JournalMaskLayer";
import AssetLayer from "./AssetLayer";
import EditLayer from "./EditLayer";
import HighlightLayer from "./HighlightLayer";
import PhotoLayer from "./PhotoLayer";
import TextLayer from "./TextLayer";
import MVTLayer from "./MVT";
import * as turf from '@turf/turf'

import _ from 'lodash';

export default class JournalMap extends CompositeLayer {

    initializeState() {

        let self = this;

        this.setState({
            altitude : 0,
            bounds : null
        });
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    renderLayers() {
        const { altitude , cameraBearing} = this.state;
        const {  font, image, out, center, title, client, refetch, slide,selectedAsset, setSelectedAsset } = this.props;

        const height = this.props.width;
        //lock the mask to the bounds of the 500x600 container
        const tl = (this.context.deck.viewManager._viewports[0].unproject([0, height],                  {topLeft : false}));
        const tr = (this.context.deck.viewManager._viewports[0].unproject([this.props.width, height],   {topLeft : false}));
        const bl = (this.context.deck.viewManager._viewports[0].unproject([0,0],                        {topLeft : false}));
        const br = (this.context.deck.viewManager._viewports[0].unproject([this.props.width,0],         {topLeft : false}));

        const bounds = [ bl, tl, tr, br ];

        const zoom = (this.context.viewport.zoom);

        const masklayer = new JournalMaskLayer({ bounds: bounds });

        let t = turf.lineString(this.props.data.features.map(d => d.geometry.coordinates));

       // console.log(t);
      //  console.log(turf.linestring(this.props.data.data.features).map(s => s.geometry.coordinates));

        //console.log(t);
        const route = new GeoJsonLayer({
            id: 'route-layer',
            data : turf.featureCollection([t]),
            lineWidthScale: 1,
            lineWidthMinPixels: 12,
            lineWidthMaxPixels: 14,
            getLineColor: [255, 238,100, 255],
            getRadius: 100,
            getLineWidth: 10,
            _subLayerProps: {
                "line-strings": {type: CustomPathLayer},
            }

        });

        const mvt = new MVTLayer();


        const tilelayer = new TileLayer({ data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', tileSize: 256, renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {
                    data: null,
                    desaturate : 1,
                    opacity : 0.9,
                    image: props.data,
                    bounds: [west, south, east, north],

                });
            }});

        //const hl = new HighlightLayer();

       // const pl = new PhotoLayer();

       // const text = new TextLayer({ data : slide.assets.filter(a => a.type === 'text'), font });

       //s let assets = new AssetLayer({ data : _(slide.assets).filter( a => a.type === 'asset')});

        return [  tilelayer, route   ];
    }
}

JournalMap.componentName = 'JournalMap';
