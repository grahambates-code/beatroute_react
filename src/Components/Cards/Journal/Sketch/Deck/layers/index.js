import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer, TextLayer} from '@deck.gl/layers';
import {TileLayer} from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import CustomPathLayer from "./CustomPathLayer";
import JournalMaskLayer from "./Masks/JournalMaskLayer";
import AssetLayer from "./AssetLayer";
import EditLayer from "./EditLayer";

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
        const {  image, out, center, title, client, refetch, slide,selectedAsset, setSelectedAsset } = this.props;

        const height = this.props.width;
        //lock the mask to the bounds of the 500x600 container
        const tl = (this.context.deck.viewManager._viewports[0].unproject([0, height],                  {topLeft : false}));
        const tr = (this.context.deck.viewManager._viewports[0].unproject([this.props.width, height],   {topLeft : false}));
        const bl = (this.context.deck.viewManager._viewports[0].unproject([0,0],                        {topLeft : false}));
        const br = (this.context.deck.viewManager._viewports[0].unproject([this.props.width,0],         {topLeft : false}));

        const bounds = [ bl, tl, tr, br ];

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
            id: 'text-layer',
            data : [1],
            pickable: false,
            getPosition: d => [ -2.978496551513672, 54.533135289883056 ],
            getText: d => 'A fun day out',
            getSize: 4000,
            sizeUnits : 'meters',
            getAngle: 32,
            billboard : false,
            getTextAnchor: 'middle',
            fontFamily : 'DJB Sand Shoes and a Fez',
            getAlignmentBaseline: 'center'
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

        let grouped = _(slide.assets)
                .groupBy(x => x.type)
                .map((value, key) => ({type: key, assets: value}))
                .value();

        let assets = grouped.map(a =>  new AssetLayer({ data : a.assets, type : a.type}));

        let selectedAssetLayer = selectedAsset && new EditLayer({refetch : refetch, client : client, asset : selectedAsset});

        return [  tilelayer, route, text, assets, selectedAssetLayer, masklayer    ];
    }
}

JournalMap.componentName = 'JournalMap';
