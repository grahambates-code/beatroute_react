import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer} from '@deck.gl/mesh-layers';

export default class PhotoLayer extends CompositeLayer {

    renderLayers() {

        const { data, type, media } = this.props;

        return [

            new ScenegraphLayer({

                id: 'photo-layer',
                data :media,
                pickable: true,
                xscenegraph : '/assets/journal/1.glb',
                scenegraph: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
                opacity : 1,
                sizeScale: 100,
                _lighting: 'pbr',

                getPosition: p => {
                    const a = p.location.replace('(', '').replace(')', '').split(',');
                    return [+a[0], +a[1]];

                    },
            })

        ];
    }
}

PhotoLayer.componentName = 'PhotoLayer';
