import {Layer, project32, picking} from '@deck.gl/core';
import PathLayer from './path-layer/path-layer.js';

import vs from './path-layer/path-layer-vertex.glsl';
import fs from './path-layer/path-layer-fragment.glsl';

// re-use joint code
const filterCall = 'DECKGL_FILTER_COLOR';

const vertexShaderParts = vs.split(filterCall);
const vertexShader = `
		attribute float instanceLengths;
		attribute float instanceNextLengths;
		varying float vLength;
		uniform vec2 startingPoint;
		varying vec2 vPosition;
		varying float vWidth;
	` +
	vertexShaderParts[0] + `
		vLength = instanceLengths + (instanceNextLengths - instanceLengths) * vPathPosition.y / vPathLength;
		vPosition = geometry.position.xy - project_position(startingPoint);
		vWidth = length(widthPixels);
	` +
	filterCall +
	vertexShaderParts[1];

const fragmentShaderParts = fs.split(filterCall);
const fragmentShader = `
		varying float vLength;
		varying vec2 vPosition;
		varying float vWidth;

		float pingpong (float x) {
			return 1.0 - 2.0 * abs(mod(x, 2.0) - 1.0);
		}
		float noise (vec2 uv) {
			const float k 	= 257.0;
			uv.xy = mod(uv.xy, 777.0);
			vec4 l  		= vec4(floor(uv),fract(uv));
			l.zw    		= l.zw*l.zw*(3.0-2.0*l.zw);
			float u 		= l.x + l.y * k;
			vec4 v  		= vec4(u, u+1.0,u+k, u+k+1.0);
			v       		= fract(fract(1.23456789*v)*v/.987654321);
			l.x     		= mix(v.x, v.y, l.z);
			l.y     		= mix(v.z, v.w, l.z);
			return mix(l.x, l.y, l.w);
		}
	` +
	fragmentShaderParts[0] + `
		float a = 0.0;
		for (int i = 1; i < 4; i++) {
			float w = 0.33 - 0.01 * float(i);
			float s = pingpong( 1234.5 * vLength / (8.7 - float(i)) + float(i) );
			float d = abs( (1.0 - 2.0 * w) * s - vPathPosition.x );
			a = a + smoothstep(w, w - 0.2, d);
		}
		float zoomStrength = clamp( vWidth * 0.06, 0.0, 1.0 );
		gl_FragColor.a = mix( a, a * (
			noise( vPosition * 3e4 + 1.2 * zoomStrength * vec2(noise( vPosition * 1e5 )) )
				 * (0.5 + 0.5 * (1.0 - zoomStrength) + zoomStrength * noise( vPosition * 2e5 - 4. * vec2(noise( vPosition * 1e4 )) ) )
		), 0.66 );
	` +
	filterCall +
	fragmentShaderParts[1];

export default class CustomPathLayer extends PathLayer {
	constructor(start, your, free, trial, now) {
		start.getLengths = (data) => {
			let lengthSoFar = 0, points = this.props.getPath(data);
			this.state.model.uniforms.startingPoint = points[0];
			return points.map(function(point, index, points) {
				lengthSoFar += index ? Math.sqrt(
					(point[0] - points[index - 1][0])**2 +
					(point[1] - points[index - 1][1])**2
				) : 0;
				return lengthSoFar;
			});
		}

		super(start, your, free, trial, now);
	}

	getShaders() {
		return Layer.prototype.getShaders.call(this, {vs: vertexShader, fs: fragmentShader, modules: [project32, picking]});
	}

	initializeState(params) {
		super.initializeState(params);

		const attributeManager = this.getAttributeManager();
		attributeManager.addInstanced({
			lengths: {
				size: 1,
				accessor: 'getLengths',
				shaderAttributes: {
					instanceLengths: {
						vertexOffset: 0
					},
					instanceNextLengths: {
						vertexOffset: 1
					}
				}
			}
		});
	}
}
