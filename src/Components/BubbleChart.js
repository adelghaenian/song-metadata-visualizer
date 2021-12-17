import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { nest } from 'd3-collection';
export default function BubbleChart(props) {
    const BubbleChartRef = useRef();

    const [init, setInit] = React.useState(false);
    var x_axis = props.x_axis
    var y_axis = props.y_axis
    var bubble_color = props.bubble_color
    var bubble_size = props.bubble_size

    const color = d3.color()
    var margin = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 50,
    },
        width = (props.device_width - margin.left - margin.right) - 500,
        height = (props.device_height - margin.top - margin.bottom) - 100
    useEffect(() => {


        let svg = d3.select(BubbleChartRef.current);

        var data = props.music_data

        var year_data = data.filter((d) => Number(d["year"]) === Number(props.selectedYear));
        // svg = container
        //     .append("svg")
        //     .attr("id", "svgBubbleContainer")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        //     .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Add X axis
        var x, y

        var color = d3.scaleLinear()
            .domain([0, 1])
            .range(["orange", "red"]);



        x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([0, width]);
        y = d3
            .scaleLinear()
            .domain([0, 1])
            .range([height, 0]);

        if (!init) {

            let x_height = height - 20
            svg
                .append("g")
                .attr("id", "x-axis")
                .attr("transform", "translate(0," + x_height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("fill", "#fff")
                .attr("opacity", "0.6")

            svg.append("g")
                .attr("transform", "translate(" + 20 + ", 0)")
                .attr("id", "y-axis")
                .call(d3.axisLeft(y))
                .selectAll("text")
                .attr("fill", "#fff")
                .attr("opacity", "0.6")

            setInit(true)
        }

        svg
            .selectAll("circle").remove()

        svg
            .selectAll("circle")
            .data(year_data)
            .enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return x(d[x_axis]) + 10
            })
            .attr("cy", function (d) {
                return y(d[y_axis]) - 20
            })
            .attr("r", function (d) {
                return d[bubble_size] * 15 + 2;
            })
            .attr("style", function (d) {
                console.log(color(d[bubble_color]));
                return "fill: " + color(d[bubble_color])
            });

        console.log(props.x_axis);
    }, [props.music_data, props.x_axis, props.y_axis, props.bubble_size, props.bubble_color, props.selectedYear]);

    return (

        <svg ref={BubbleChartRef} className='bubble-chart-svg'
            width={width}
            height={height}
        />
    );
}