import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer, GeoJsonLayer, TextLayer} from '@deck.gl/layers';
import GL from '@luma.gl/constants';

export default class JournalMaskLayer extends CompositeLayer {

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

        const papermasklayer = new BitmapLayer({
            id: 'mask-bitmap-paper-layer',
            bounds: bounds,
            image: './textures/hand-map-mask-04.png',
            parameters: {
                depthTest: true,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR]
            }

        });

        const handslayer = new BitmapLayer({
            id: 'mask-bitmap-layer',
            bounds: bounds,
            image: './textures/hands-map-05.png',
        });

        return [ papermasklayer, handslayer];
    }
}

JournalMaskLayer.componentName = 'JournalMaskLayer';
