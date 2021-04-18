import { Geometry } from '@luma.gl/engine';
import * as THREE from 'three';

export function CustomGeometry ({ font, text }) {

    const geometry = new THREE.TextGeometry( text, {
        font : font,
        size: 300,
        height: 1,
    } );

    // face indices generation
    const indices = Array.from(Array(geometry.attributes.position.count), (x, i) => i);

    // luma.gl custom geometry
    return new Geometry({
        attributes: {
            indices: new Uint16Array(indices),
            positions: geometry.attributes.position.array,
            texCoords: geometry.attributes.uv.array,
            normals: geometry.attributes.normal.array
        },
    });

};
