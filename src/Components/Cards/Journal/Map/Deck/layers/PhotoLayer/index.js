import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';

export default class PhotoLayer extends CompositeLayer {
    renderLayers() {
        const { data, type } = this.props;

        return [
            new ScenegraphLayer({
                id: 'photo-layer',

                data: [{ position: [40.45166015625, 43.3419109985686] }],

                pickable: true,

                scenegraph: '/assets/journal/5.glb',

                opacity: 1,

                getPosition: (p) => p.position,

                getTranslation: (asset) => [0, 0, -200],

                getScale: (asset) => [300, 300, 300],

                sizeScale: 5500,

                // _lighting: 'pbr'
            }),
        ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';
