import { CompositeLayer } from '@deck.gl/core';
import { BitmapLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';
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
        const { bounds } = this.props;

        const papermasklayer = new BitmapLayer({
            id: 'mask-bitmap-paper-layer',
            bounds: bounds,
            image: './textures/paper1.png',
            parameters: {
                depthTest: false,
                depthMask: true,
                blend: true,
                blendEquation: GL.FUNC_ADD,
                blendFunc: [GL.ONE, GL.ONE_MINUS_SRC_COLOR],
            },
        });

        return [papermasklayer];
    }
}

JournalMaskLayer.componentName = 'JournalMaskLayer';
