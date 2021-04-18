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

        const route = new GeoJsonLayer({
            id: 'route-layer',
            data : this.props.data,
            lineWidthScale: 1,
            lineWidthMinPixels: 8,
            lineWidthMaxPixels: 14,
            getLineColor: [255, 238,100, 255],
            getRadius: 100,
            getLineWidth: 10,
            _subLayerProps: {
                "line-strings": {type: CustomPathLayer},
            }

        });

        const text = new TextLayer({
            data : [1],
            font,
            text : 'Georgia' + slide.id
        });

        const tilelayer = new TileLayer({
            id : 'mask-tile',
            data: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',

            minZoom: 0,
            maxZoom: 19,
            tileSize: 256,

            renderSubLayers: props => {
                const {
                    bbox: {west, south, east, north}
                } = props.tile;

                return new BitmapLayer(props, {
                    data: null,
                    desaturate : 1,
                    opacity : 1,
                    image: props.data,
                    bounds: [west, south, east, north],

                });
            }
        });

        const hl = new HighlightLayer();

        const pl = new PhotoLayer();

        let grouped = _(slide.assets)
                .groupBy(x => x.file)
                .map((value, key) => ({file: key, assets: value}))
                .value();

        let assets = grouped.map(a =>  new AssetLayer({ data : a.assets, file : a.file, type : a.type}));

        let selectedAssetLayer = selectedAsset && new EditLayer({refetch : refetch, client : client, asset : selectedAsset});

        return [  tilelayer, hl, text, assets, selectedAssetLayer, masklayer, pl    ];
    }
}

JournalMap.componentName = 'JournalMap';
