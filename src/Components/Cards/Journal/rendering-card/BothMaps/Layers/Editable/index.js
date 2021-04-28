import { CompositeLayer } from '@deck.gl/core';
import { DrawLineStringMode, EditableGeoJsonLayer } from 'nebula.gl';

export default class EditableLayer extends CompositeLayer {
    renderLayers() {
        const { data } = this.props;

        const layer = new EditableGeoJsonLayer({
            id: 'mask-geojson-layer-linestring',
            data: data,
            opacity: 0.3,
            mode: DrawLineStringMode,
            onEdit: this.props.onEdit,
        });

        return [layer];
    }
}

EditableLayer.componentName = 'maskMaskLayer';
