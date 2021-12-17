
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import pie_artists_genre_loc from "../dataset/pie_artists_genre.csv";

export default function PieArtist(props) {
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
        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        // define the area


        var svg = container.select("#svgPieContainer");
        if (svg.empty()) {
            svg = container
                .append("svg")
                .attr("id", "svgPieContainer")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Get the data
            d3.csv(pie_artists_genre_loc).then(function (data) {

                // set the color scale
                var color = d3.scaleOrdinal()
                    .domain(data)
                    .range(d3.schemeTableau10);

                // X axis
                const x = d3.scaleBand()
                    .range([0, width])
                    .domain(data.map(d => d.rf_label))
                    .padding(0.2);
                svg.append("g")
                    .attr("transform", `translate(0, ${height})`)
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .attr("fill", "#f1f1f1")
                    .style("text-anchor", "end");

                // Add Y axis
                const y = d3.scaleLinear()
                    .domain([0, 17200])
                    .range([height, 0]);
                svg.append("g")
                    .call(d3.axisLeft(y))
                    .selectAll("text")
                    .attr("fill", "#f1f1f1");

                // Bars
                svg.selectAll("mybar")
                    .data(data)
                    .join("rect")
                    .attr("x", d => x(d.rf_label))
                    .attr("y", d => y(d.artists))
                    .attr("width", x.bandwidth())
                    .attr("height", d => height - y(d.artists))
                    .attr("fill", d => {
                        return color(d.rf_label)
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
