import { CompositeLayer } from '@deck.gl/core';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import _ from 'lodash';

export default class AssetLayer extends CompositeLayer {
    renderLayers() {
        const { data, file } = this.props;

        let grouped = data
            .groupBy((x) => x.data.file)
            .map((values, key) => ({ key: key, values: values }))
            .value();

        return grouped.map(
            (a) =>
                new ScenegraphLayer({
                    data: a.values,

                    scenegraph: a.key,

                    opacity: 1,

                    getPosition: (asset) => asset.position,

                    getTranslation: (asset) => [0, 0, -11000],

                    getOrientation: (asset) => [0, 0, 90],

                    getScale: (asset) => [asset.scale, asset.scale, 1],

                    sizeScale: 25000,

                    _lighting: 'pbr',
                }),
        );
    }
}

AssetLayer.componentName = 'AssetLayer';
