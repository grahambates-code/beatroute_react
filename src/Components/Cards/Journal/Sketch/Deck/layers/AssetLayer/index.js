import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer} from '@deck.gl/mesh-layers';

export default class AssetLayer extends CompositeLayer {

    renderLayers() {

        const { data, type, file } = this.props;

        return [

            new ScenegraphLayer({

                id: 'scenegraph-layer' + file,

                data :data,

                pickable: true,

                scenegraph : file,

                opacity : 1,

                getPosition: asset => asset.position,

                getTranslation : asset=> asset.translation,

                getOrientation: asset => [0, asset.rotation, 90 ],

                getScale: (asset) =>[asset.scale,asset.scale,asset.scale],

                sizeScale: 25000,

                 _lighting: 'pbr'
            })

        ];
    }
}

AssetLayer.componentName = 'AssetLayer';
