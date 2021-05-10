import React from 'react'
import ReactAnnotation from 'react-annotation'
import ReactRough, { Rectangle, Line } from 'react-rough';
import * as d3 from 'd3'

const stock = [
    {
        date : "17-Apr-12",
        close : 45
    },

    {
        date : "18-Apr-12",
        close : 66
    },

    {
        date : "19-Apr-12",
        close : 75
    }


];
export default class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false
        }
    }

    render() {
        const { AnnotationCallout } = ReactAnnotation

        const margin = { top: 20, right: 20, bottom: 30, left: 20 },
            height = 500 - margin.top - margin.bottom,
            width = 500 - margin.left - margin.right

        const x = d3.scaleTime().range([0, width])
        const y = d3.scaleLinear().range([height, 0])

        const valueline = d3
            .line()
            .x(d => x(d.date))
            .y(d => y(d.close))

        stock.forEach(function(d) {
            d.date = new Date(d.date)
            d.close = +d.close
        })

        x.domain(d3.extent(stock, d => d.date))
        y.domain([0, d3.max(stock, d => d.close)])

        //Add annotations
        const labels = [
            {
                data: { date: "17-Apr-12", close: 45.23 },
                dy: 50,
                dx: 50
            }

        ].map(l => {
            l.note = Object.assign({}, l.note, {
                title: `Close: ${l.data.close}`,
                label: `${l.data.date}`
            })
            l.x = x(new Date(l.data.date))
            l.y = y(l.data.close)
            l.subject = { radius: 4 }

            return l
        })

        const annotations = labels.map((a, i) => (
            <g key={i}>
                <AnnotationCallout
                    dx={a.dx}
                    dy={a.dy}
                    color={"#9610ff"}

                    x={a.x}
                    y={a.y}
                    note={a.note}
                    subject={a.subject}
                />
                <circle
                    fill="#9610ff"
                    r={5}
                    cx={a.x}
                    cy={a.y}
                    onMouseOver={() =>
                        this.setState({
                            hover: i
                        })}
                    onMouseOut={() =>
                        this.setState({
                            hover: null
                        })}
                />
            </g>
        ))

        return (

                    <ReactRough  renderer="svg" config={{ options: { roughness: 0.5 } }} height={500} renderer="svg" width={500}>

                        <Line
                            x1={0}
                            x2={width}
                            y1={height }
                            y2={height }
                        />

                        <Line
                            x1={0}
                            x2={0}
                            y1={0 }
                            y2={height }
                        />

                        <path d={valueline(stock)} stroke="#ddd" fill="none" />

                        {annotations}
                    </ReactRough>

        )
    }
}
