import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import line_for_songs_genre_count_location from "../dataset/line_for_songs_genre_count.csv";
import { color } from "d3";

export default function GenreOverYears(props) {
    const myRef = useRef();
    const colors = d3["schemeTableau10"];

    useEffect(() => {
        let container = d3.select(myRef.current);
        var margin = {
            top: 20,
            right: 40,
            bottom: 30,
            left: 50,
        },
            width = props.device_width - margin.left - margin.right,
            height = props.device_height - 200 - margin.bottom;

        // set the ranges
        var y = d3.scaleLinear().range([height, 0]);

        // define the area


        var svg = container.select("#svgOverYearsContainer");
        if (svg.empty()) {
            svg = container
                .append("svg")
                .attr("id", "svgOverYearsContainer")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            d3.csv(line_for_songs_genre_count_location).then(function (data) {
                // format the data
                const sumstat = d3.group(data, d => d.rf_label);
                // Scale the range of the data


                var x = d3.scaleLinear().range([0, width]);
                x.domain([1920, 2021]);

                svg
                    .append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).ticks(40).tickFormat(d3.format("d")))
                    .selectAll("text")
                    .attr("y", 10)
                    .attr("fill", "#fff")
                    .attr("opacity", "0.6")
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(45)")
                    .style("text-anchor", "start");

                const y = d3.scaleLinear()
                    .domain([0, d3.max(data, function (d) { return +d.count; })])
                    .range([height, 0]);

                svg.append("g")
                    .call(d3.axisLeft(y))
                    .selectAll("text")
                    .attr("fill", "#fff")
                    .attr("opacity", "0.6")

                const color = d3.scaleOrdinal()
                    .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])


                var legend = svg
                    .selectAll(".legend")
                    .data(sumstat)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(0," + i * 20 + ")";
                    });

                legend
                    .append("rect")
                    .attr("x", width - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", function (d) {
                        return color(d[0])
                    });

                legend
                    .append("text")
                    .attr("x", width - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .style("fill", "white ")
                    .text(function (d) {
                        return d[0]
                    });

                svg.selectAll(".line")
                    .data(sumstat)
                    .join("path")
                    .attr("fill", "none")
                    .attr("stroke", function (d) { return color(d[0]) })
                    .attr("stroke-width", 1.5)
                    .attr("d", function (d) {
                        return d3.line()
                            .x(function (d) { return x(d.year); })
                            .y(function (d) { return y(+d.count); })
                            (d[1])
                    })
            })
        }
    }, []);

    return (
        <>
            <div ref={myRef}> </div>
        </>
    );
}
