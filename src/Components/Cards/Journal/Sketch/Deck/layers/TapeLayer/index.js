import { CompositeLayer } from '@deck.gl/core';
import {BitmapLayer} from '@deck.gl/layers';
import {readPixelsToArray} from '@luma.gl/core';
import * as d3 from 'd3';
import {Matrix4} from "math.gl";

var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 800;

// canvas.addEventListener("mousemove", function(e){
//     console.log(1);
// }, false);


var xLast=0, yLast=450, xNow=0, yNow=0;
var Xarray = [], Yarray=[];
var brushDiameter = 7;

var context = canvas.getContext("2d");

var margin = {top: 20, right: 70, bottom: 20, left: 100},
    width = canvas.width - margin.left - margin.right,
    height = canvas.height - margin.top - margin.bottom;

var parseTime = d3.timeParse("%d-%b-%y");

var x = d3.scaleTime()
    .range([0, width]);

var y = d3.scaleLinear()
    .range([height, 0]);

var line = d3.line()
    .x(function(d) {
            Xarray.push(x(d.date));
            // console.log(x(d.date));
            return x(d.date);
        }
    )
    .y(function(d) {
            Yarray.push(y(d.close));
            // console.log(y(d.close));
            return y(d.close);
        }
    )
    .curve(d3.curveStep)
    .context(context);

context.translate(margin.left, margin.top);

d3.tsv("data.tsv", function(d) {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
}).then(function(data) {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    xAxis();
    yAxis();

    line(data);

    context.lineWidth = brushDiameter;
    for(var j=1;j<Xarray.length;j++){
        context.beginPath();
        context.strokeStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')';
        xNow = Xarray[j];
        yNow = Yarray[j];
        //console.log( xLast, yLast,"--" ,xNow, yNow ,"---",'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')');
        context.moveTo(xLast, yLast);
        context.lineTo(xNow, yNow);

        context.stroke();

        // Chalk Effect
        var length = Math.round(Math.sqrt(Math.pow(xNow-xLast,2)+Math.pow(yNow-yLast,2))/(0.5 * brushDiameter));
        var xUnit = (xNow-xLast)/length;
        var yUnit = (yNow-yLast)/length;
        for(var i=0; i<length; i++ ){
            var xCurrent = xLast+(i*xUnit);
            var yCurrent = yLast+(i*yUnit);
            var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*0.4;
            var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*0.4;
            context.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
        }
        xLast = xNow;
        yLast = yNow;
    }

});

function xAxis() {
    var tickCount = 10,
        tickSize = 6,
        ticks = x.ticks(tickCount),
        tickFormat = x.tickFormat();

    context.beginPath();
    ticks.forEach(function(d) {
        context.moveTo(x(d), height);
        context.lineTo(x(d), height + tickSize);
    });
    context.strokeStyle = "white";
    context.stroke();

//   context.beginPath();
//   context.moveTo(0, height);
//   context.lineTo(width, height);
//   context.strokeStyle = "white";
//   context.stroke();

    context.textAlign = "center";
    context.textBaseline = "top";
    context.fillStyle = "white";
    ticks.forEach(function(d) {
        context.fillText(tickFormat(d), x(d), height + tickSize);
    });
}

function yAxis() {
    var tickCount = 10,
        tickSize = 6,
        tickPadding = 3,
        ticks = y.ticks(tickCount),
        tickFormat = y.tickFormat(tickCount);

    context.beginPath();
    ticks.forEach(function(d) {
        context.moveTo(0, y(d));
        context.lineTo(-6, y(d));
    });
    context.strokeStyle = "white";
    context.stroke();

    context.beginPath();
    context.moveTo(-tickSize, 0);
    context.lineTo(0.5, 0);
    context.lineTo(0.5, height);
    context.lineTo(-tickSize, height);
    context.strokeStyle = "white";
    context.stroke();

    context.textAlign = "right";
    context.textBaseline = "middle";
    context.fillStyle = "white";
    ticks.forEach(function(d) {
        context.fillText(tickFormat(d), -tickSize - tickPadding, y(d));
    });

    context.save();
    context.rotate(-Math.PI / 2);
    context.textAlign = "right";
    context.textBaseline = "top";
    context.font = "bold 10px sans-serif";
    context.fillText("Price (US$)", -10, 10);
    context.restore();
}

export default class TapeLayer extends CompositeLayer {

    initializeState() {

        let self = this;

        this.setState({ });
    }

    shouldUpdateState({ changeFlags }) {
        return changeFlags.somethingChanged;
    }

    finalizeState() {
        super.finalizeState();
    }

    onClick(things) {
        console.log(things.pixel);
    }

    renderLayers() {
        const {  } = this.state;
        const {  bounds } = this.props;

        const t = new BitmapLayer({
            opacity : 1,
            pickable : true,
            onClick: ({bitmap, layer}) => {
                console.log('tape');
                if (bitmap) {
                    const pixelColor = readPixelsToArray(layer.props.image, {
                        sourceX: bitmap.pixel[0],
                        sourceY: bitmap.pixel[1],
                        sourceWidth: 1,
                        sourceHeight: 1
                    })
                    console.log('Color at picked pixel:', pixelColor)
                }
            },
            id: 'mask-arrow-tape',
            bounds: bounds,
            image : canvas,
            //image : '/textures/postit.png',

        })

        return [ t ] ;
    }
}

TapeLayer.componentName = 'TapeLayer';
