import * as d3 from 'd3';

const DEFAULT_MARGIN = {
    top: 24,
    right: 32,
    bottom: 48,
    left: 48
};

export const DEFAULT_XAXIS = {};
export const DEFAULT_YAXIS = {
    format: (d) => d3.format('.2f')(d)
};

class BaseChart {
    timeout = null;
    DEBOUNCE_TIME = 500;
    xScale = d3.scaleUtc();
    yScale = d3.scaleLinear();
    xAxis = DEFAULT_XAXIS;
    yAxis = DEFAULT_YAXIS;

    constructor({ data, dimension, parentEl, margin = DEFAULT_MARGIN }) {
        this.data = data;
        this.margin = margin;
        this.dimension = dimension;
        this.parentEl = parentEl;
        
        this._handleOnResize = this._handleOnResize.bind(this);

        window.addEventListener('resize', this._handleOnResize);
    }

    update(data) {
        this.data = data;

        const dimension = this._getDimension();

        this.width = dimension.width;
        this.height = dimension.height;
        this.innerWidth = this.width - this.margin.left - this.margin.right;
        this.innerHeight = this.height - this.margin.top - this.margin.bottom;

        this.svg = this._getSvg();
        this.rootGroup = this._getGroup();

        this.draw();
    }

    /**
     * Abstract method
     */
    draw() {

    }

    createElement(elementTag, className, parent) {
        let selector = elementTag;

        if (className !== '') {
            selector += `.${className}`;
        }

        let element = parent.select(selector);

        if (element.empty()) {
            element = parent.append(elementTag);
        }

        if (className !== '') {
            return element.attr('class', className);
        }

        return element;
    }

    remove(cb) {
        window.removeEventListener('resize', this._handleOnResize);
        
        if (typeof cb === 'function') {
            cb();
        }
    }

    _getSvg() {
        let svg = d3.select(this.parentEl).select('svg');
        
        if (svg.empty()) {
            svg = d3.select(this.parentEl).append('svg');
        }

        svg
            .attr('width', this.width)
            .attr('height', this.height)

        return svg;
    }

    _getGroup() {
        let group = this.svg.select('g');

        if (group.empty()) {
            group = this.svg.append('g');
        }

        return group.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }

    _getDimension() {
        let width = this.dimension.width || this.parentEl.offsetWidth;
        let height = this.dimension.height || this.parentEl.offsetHeight;

        return {
            width,
            height
        };
    }

    _handleOnResize() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.update(this.data);
        }, this.DEBOUNCE_TIME);
    }
}

export default BaseChart;