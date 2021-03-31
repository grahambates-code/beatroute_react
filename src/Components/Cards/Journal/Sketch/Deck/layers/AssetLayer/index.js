import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer} from '@deck.gl/mesh-layers';

export default class AssetLayer extends CompositeLayer {

    // initializeState() {
    //
    //     let self = this;
    //
    //     this.setState({ });
    // }
    //
    // shouldUpdateState({ changeFlags }) {
    //     return changeFlags.somethingChanged;
    // }
    //
    // finalizeState() {
    //     super.finalizeState();
    // }

    renderLayers() {
        //const {  } = this.state;
        const { asset } = this.props;

        return [

            new ScenegraphLayer({

                id: 'scenegraph-layer' + asset.id,

                data : [asset],

                pickable: true,

                scenegraph : asset.type,

                opacity : 1,

                getPosition: asset => asset.position,

                getTranslation : asset=> asset.translation,

                getOrientation: asset => [0, asset.rotation, 90 ],

                getScale: (asset) =>[asset.scale,asset.scale,asset.scale],

                sizeScale: 4,

                 _lighting: 'pbr'
            })

        ];
    }
}

AssetLayer.componentName = 'AssetLayer';
