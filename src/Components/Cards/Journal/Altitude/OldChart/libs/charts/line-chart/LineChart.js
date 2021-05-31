import * as d3 from 'd3';
import BaseChart, { DEFAULT_XAXIS, DEFAULT_YAXIS } from '../BaseChart';

export class LineChart extends BaseChart {
    selectionHeight = 128;
    selectionPadding = 48;
    xFocus = [];
    yFocus = [];

    constructor(props) {
        super(props);
        this.xScale = d3.scaleUtc();
        this.yScale = d3.scaleLinear();
        this.color = props.color;
    }

    draw() {
        super.draw();

        let minY = d3.min(this.data, d => d.y);
        minY = minY > 0 ? 0 : minY;
        let maxY = d3.max(this.data, d => d.y);
        maxY = maxY < 0 ? 0 : maxY;

        this.yMinMax = [minY, maxY];

        this.xScale = this.xScale
            .domain(d3.extent(this.data, d => d.x))
            .range([0, this.innerWidth]);

        this.yScale = this.yScale
            .domain(this.yMinMax)
            .range([this.innerHeight - this.selectionHeight, 0]);

        this.redrawCharts();

        this.drawSelection();
    }

    redrawCharts() {
        this.svg
            .attr('viewBox', [0, 0, this.width, this.height]);

        this.drawDefs();
        this.drawAxises();
        this.drawAreas();
        this.drawLines();
    }

    drawAxises() {
        const xAxisGroup = this.createElement('g', 'axis-x', this.rootGroup);
        xAxisGroup
            .attr('class', 'axis axis-x')
            .attr('transform', `translate(0, ${this.innerHeight - this.selectionHeight})`)
            .transition()
            .call(
                d3.axisBottom(this.xScale)
                    .tickFormat((this.xAxis || DEFAULT_XAXIS).format)
                    .tickPadding(8)
                    .tickSizeOuter(0)
            );

        const yAxisGroup = this.createElement('g', 'axis-y', this.rootGroup);
        yAxisGroup
            .attr('class', 'axis axis-y')
            .attr('transform', 'translate(0, 0)')
            .transition()
            .call(
                d3.axisLeft(this.yScale)
                    .tickSize(-this.innerWidth)
                    .tickFormat((this.yAxis || DEFAULT_YAXIS).format)
                    .tickPadding(8)
                    .ticks(6)
            )
    }

    drawLines() {
        const linesGroup = this.createElement('g', 'lines-group', this.rootGroup);

        const lineGenerator = d3.line()
            .x(d => this.xScale(d.x))
            .y(d => this.yScale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'line', linesGroup)
            .datum(this.data)
            .attr('class', 'line')
            .attr('stroke', this.color)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr('d', lineGenerator);
    }

    drawAreas() {
        const areasGroup = this.createElement('g', 'areas-group', this.rootGroup);
        const areaGenerator = d3.area()
            .defined(d => !isNaN(d.y))
            .x(d => this.xScale(d.x))
            .y0(this.yScale(this.yMinMax[0]))
            .y1(d => this.yScale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'area', areasGroup)
            .datum(this.data)
            .attr('class', 'area')
            .attr('fill', 'url(#def-linear-gradient)')
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr('d', areaGenerator);
    }

    drawSelection() {
        this.selectionGroup = this.createElement('g', 'selection-group', this.rootGroup);
        const brushHeight = this.selectionHeight - this.selectionPadding;
        const brushXscale = this.xScale.copy();
        const brushYscale = this.yScale.copy().range([brushHeight, 0]);

        const areaGenerator = d3.area()
            .defined(d => !isNaN(d.y))
            .x(d => brushXscale(d.x))
            .y0(brushYscale(this.yMinMax[0]))
            .y1(d => brushYscale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'area', this.selectionGroup)
            .datum(this.data)
            .attr('class', 'area')
            .attr('fill', 'url(#def-linear-gradient)')
            .attr('transform', `translate(0, ${this.selectionPadding})`)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr('d', areaGenerator);

        const lineGenerator = d3.line()
            .x(d => brushXscale(d.x))
            .y(d => brushYscale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'line', this.selectionGroup)
            .datum(this.data)
            .attr('class', 'line line--sm')
            .attr('transform', `translate(0, ${this.selectionPadding})`)
            .attr('stroke', this.color)
            .transition()
            .duration(750)
            .ease(d3.easeLinear)
            .attr('d', lineGenerator);

        const brush = d3.brushX()
            .extent([[0, 0], [this.innerWidth, brushHeight]])
            .on("brush", brushed)
            .on("end", brushEnded);

        const context = this;

        this.selectionGroup
            .attr('transform', `translate(0, ${this.innerHeight - this.selectionHeight})`);

        const gb = this.createElement('g', 'brush-group',  this.selectionGroup)
            .attr('transform', `translate(0, ${this.selectionPadding})`)
            .call(brush)
            .call(brush.move, brushXscale.range());



        function brushed({ selection }) {
            if (selection) {
                context.xFocus = selection.map(brushXscale.invert, brushXscale);
                context.yFocus = context.yMinMax;

                const xScale = context.xScale.copy().domain(context.xFocus);
                const yScale = context.yScale.copy();

                context.drawMagnifyingView(context.data, xScale, yScale);
            }
        }

        function brushEnded({selection}) {
            if (!selection) {
                gb.call(brush.move, brushXscale.range());
            }
        }
    }

    drawDefs() {
        const defs = this.createElement('defs', 'chart-defs', this.rootGroup);

        const linearGradient = this.createElement('linearGradient', 'chart-linear-gradient', defs);
        linearGradient
            .attr('id', 'def-linear-gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        this.createElement('stop', 'chart-linear-gradient-stop-1', linearGradient)
            .attr('offset', '0%')
            .attr('stop-color', this.color);

        this.createElement('stop', 'chart-linear-gradient-stop-2', linearGradient)
            .attr('offset', '100%')
            .attr('stop-color', this.color)
            .attr('stop-opacity', 0);
    }

    drawMagnifyingView(data, xScale, yScale) {
        const magnifyGroup = this.createElement('g', 'magnify-group', this.rootGroup);

        const innerChartWidth = this.innerWidth;
        const innerChartHeight = this.innerHeight - this.selectionHeight;
        const scale = 0.5;
        const magnifyWidth = (Math.min(innerChartWidth, innerChartHeight)) * scale;
        const magnifyHeight = magnifyWidth;
        const radius = magnifyWidth / 2;

        const magnifyXScale = xScale.range([0, magnifyWidth]);
        const magnifyYScale = yScale.range([magnifyHeight, 0]);

        const circleView = this.createElement('circle', 'magnify-view-rect', magnifyGroup);
        circleView
            .attr('r', radius)
            .attr('cx', radius)
            .attr('cy', radius)
            .attr('stroke', this.color);

        const clipPath = this.createElement('clipPath', 'magnify-clip-path', magnifyGroup)
            .attr('id', 'clipPathDef');

        this.createElement('circle', '', clipPath)
            .attr('r', radius)
            .attr('cx', radius)
            .attr('cy', radius);

        const areaGenerator = d3.area()
            .defined(d => !isNaN(d.y))
            .x(d => magnifyXScale(d.x))
            .y0(magnifyYScale(this.yMinMax[0]))
            .y1(d => magnifyYScale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'area', magnifyGroup)
            .datum(data)
            .attr('class', 'area')
            .attr('fill', 'url(#def-linear-gradient)')
            .attr('clip-path', 'url(#clipPathDef)')
            .transition()
            .duration(250)
            .ease(d3.easeLinear)
            .attr('d', areaGenerator);

        const lineGenerator = d3.line()
            .x(d => magnifyXScale(d.x))
            .y(d => magnifyYScale(d.y))
            .curve(d3.curveLinear);

        this.createElement('path', 'line', magnifyGroup)
            .datum(data)
            .attr('class', 'line line--sm')
            .attr('clip-path', 'url(#clipPathDef)')
            .attr('stroke', this.color)
            .transition()
            .duration(250)
            .ease(d3.easeLinear)
            .attr('d', lineGenerator);

        const drag = d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged);

        function dragStarted(event, d) {
            event.sourceEvent.stopPropagation();
        }

        function dragged(event, d) {
            magnifyGroup.attr('transform', `translate(${event.x - radius}, ${event.y - radius})`);
        }

        magnifyGroup.call(drag);
    }
}
