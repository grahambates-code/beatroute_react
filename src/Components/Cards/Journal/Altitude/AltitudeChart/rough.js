
import { svgtogeojson } from 'svg-to-geojson'
import rough from 'roughjs/bundled/rough.cjs.js';
import { bbox, point, buffer, bboxPolygon, lineString, featureCollection, lengthToRadians, lengthToDegrees } from '@turf/turf';
import {scaleLinear} from 'd3-scale';
import { geoMercator } from 'd3-geo';

const createSvg = () => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', 200);
    svg.setAttribute('height', 200)
    return svg;
}

const getGeoScale = (polygon) => {
    return {
        geo: geoMercator().fitSize([200,200],polygon)
    }
}

/**
 * @param {float} lng longitutde of center point
 * @param {float} lat latitude of center point
 * @param {Number} radius radius of the circle in kilometers
 * @param {Object} roughOptions options for roughjs https://github.com/rough-stuff/rough/wiki#options
 *
 * */
const circle = (lng, lat, radius, roughOptions, debug) => {

    let p = point([lng, lat]);
    let buffered = buffer(p, radius, { units: 'kilometers' })

    let box = bbox(buffered)
    let poly = bboxPolygon(box);
    let bounds = [poly.geometry.coordinates[0][2].reverse(), poly.geometry.coordinates[0][0].reverse()]
    let {geo} = getGeoScale(poly);

    let geoCenter = geo([0,0]);
    const svg = createSvg();

    let rc = rough.svg(svg);
    let node = rc.ellipse(geoCenter[0], geoCenter[1], 100, 80, roughOptions);
    svg.appendChild(node);


    var geoJSON = svgtogeojson.svgToGeoJson(bounds, svg, 3);

    if(debug){
        geoJSON.features.push(p)
    }

    return (geoJSON)
}


/**
 *
 * @param {float} lng1 start point longiture
 * @param {float} lat1 start point latitude
 * @param {float} lng2  end point longiture
 * @param {float} lat2  end point latitude
 * @param {Object} roughOptions options for roughjs https://github.com/rough-stuff/rough/wiki#options
 * @param {boolean} debug if true it will append the points the start and end points
 * @returns
 */

const line = (lng1, lat1, lng2, lat2, roughOptions, debug) => {

    let tLine = lineString([[lng1, lat1],[lng2,lat2]]);

    let box = bbox(tLine)
    let poly = bboxPolygon(box);
    let boundsPoly = {...poly}

    let xScale = scaleLinear().range([200,0]).domain([Math.min(lng1,lng2),Math.max(lng1,lng2)])
    let yScale = scaleLinear().range([0,200]).domain([Math.min(lat1,lat2),Math.max(lat1,lat2)])

    let svg = createSvg();

    let rc = rough.svg(svg);

    let node = rc.line(xScale(lng1),yScale(lat1),xScale(lng2),yScale(lat2),roughOptions);
    svg.appendChild(node);

    var geoJSON = svgtogeojson.svgToGeoJson( [[...boundsPoly.geometry.coordinates[0][2].reverse()], [...boundsPoly.geometry.coordinates[0][0].reverse()]], svg, 3);

    if(debug){
        [[lng1,lat1],[lng2,lat2]].forEach(p => geoJSON.features.push(point([...p])))
    }
    console.log(geoJSON)
    document.body.appendChild(svg)

    return geoJSON

}

const hand_circle = (lng, lat, radius, {rounds},debug)=>{
    let p = point([lng, lat]);
    const ciPoints = handDrawCircle(lng,lat,lengthToDegrees(radius),rounds);
    const string = lineString(ciPoints);
    let collection = featureCollection([string])
    if(debug){
        collection.features.push(p)
    }

    return collection
}


function handDrawCircle(cx, cy, r, rounds) {

    /// rounds is optional, defaults to 3 rounds
    rounds = rounds ? rounds : 3;

    var x, y,                                      /// the calced point
        tol = Math.random() * (r * 0.025) + (r * 0.025), ///tolerance / fluctation
        dx = Math.random() * tol * 0.75,           /// "bouncer" values
        dy = Math.random() * tol * 0.75,
        ix = (Math.random() - 1) * (r * 0.0044),   /// speed /incremental
        iy = (Math.random() - 1) * (r * 0.0033),
        rx = r + Math.random() * tol,              /// radius X
        ry = (r + Math.random() * tol) * 0.8,      /// radius Y
        a = 0,                                     /// angle
        ad = 3,                                    /// angle delta (resolution)
        i = 0,                                     /// counter
        start = Math.random() + 50,                /// random delta start
        tot = 360 * rounds + Math.random() * 50 - 100,  /// end angle
        points = [],                               /// the points array
        deg2rad = Math.PI / 180;

    for (; i < tot; i += ad) {
        dx += ix;
        dy += iy;

        if (dx < -tol || dx > tol) ix = -ix;
        if (dy < -tol || dy > tol) iy = -iy;

        x = cx + (rx + dx * 2) * Math.cos(i * deg2rad + start);
        y = cy + (ry + dy * 2) * Math.sin(i * deg2rad + start);

        points.push([x, y]);
    }

   // console.log(points)
    return points
}

export {
    hand_circle,
    circle,
    line
}
