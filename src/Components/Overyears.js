import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import year_data from "../dataset/data_by_year.csv";
import { color } from "d3";

export default function Overyears(props) {
  const myRef = useRef();
  const colors = d3["schemeTableau10"];
  var selectedAttributes = props.selectedAttributes;
  var handleSelectedChange = props.handleAttributesChange;

  useEffect(() => {
    let container = d3.select(myRef.current);
    var margin = { top: 20, right: 40, bottom: 30, left: 50 },
      width = props.device_width - margin.left - margin.right,
      height = props.device_height - 200 - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the area
    var area_energy = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.energy);
      });

    var area_valence = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.valence);
      });

    var area_acousticness = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.acousticness);
      });

    var area_danceability = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.danceability);
      });

    var area_instrumentalness = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.instrumentalness);
      });

    var area_liveness = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.liveness);
      });

    var area_speechiness = d3
      .area()
      .x(function (d) {
        return x(d.year);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.speechiness);
      });

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
      d3.csv(year_data).then(function (data) {
        // format the data
        data.forEach(function (d) {
          d.year = Number(d.year);
          d.energy = Number(d.energy);
          d.valence = Number(d.valence);
        });

        // Scale the range of the data
        x.domain([1920, 2021]);
        y.domain([0, 1]);

        var defs = svg.append("defs");

        var gradient = defs
          .append("linearGradient")
          .attr("id", "svgGradient0")
          .attr("gradientTransform", "rotate(90)");
        gradient
          .append("stop")
          .attr("offset", "5%")
          .attr("stop-color", colors[0])
          .attr("stop-opacity", 0.4);
        gradient
          .append("stop")
          .attr("offset", "95%")
          .attr("stop-color", colors[0])
          .attr("stop-opacity", 0.05);

        // Add the area.
        if (selectedAttributes.includes("acousticness"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_acousticness)
            .attr("fill", colors[0])
            .attr("opacity", "0.4");
        if (selectedAttributes.includes("danceability"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_danceability)
            .attr("fill", colors[1])
            .attr("opacity", "0.4");

        if (selectedAttributes.includes("valence"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_valence)
            .attr("fill", colors[6])
            .attr("opacity", "0.4");

        if (selectedAttributes.includes("energy"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_energy)
            .attr("fill", colors[2])
            .attr("opacity", "0.4");

        if (selectedAttributes.includes("instrumentalness"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_instrumentalness)
            .attr("fill", colors[3])
            .attr("opacity", "0.4");

        if (selectedAttributes.includes("liveness"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_liveness)
            .attr("fill", colors[4])
            .attr("opacity", "0.4");

        if (selectedAttributes.includes("speechiness"))
          svg
            .append("path")
            .data([data])
            .attr("class", "area")
            .attr("d", area_speechiness)
            .attr("fill", colors[5])
            .attr("opacity", "0.4");

        svg.selectAll("path").on("mouseover", function (e) {
          d3.select(this).attr("opacity", "1");
        });

        svg.selectAll("path").on("mouseout", function (e) {
          d3.select(this).attr("opacity", "0.4");
        });

        // Add the X Axis
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

        // Add the Y Axis
        svg.append("g").call(d3.axisLeft(y).ticks(0));
      });
    }
  }, [selectedAttributes]);

  return (
    <>
      <div
        id={"featuresContainer"}
        style={{
          height: "70px",
          display: "-webkit-inline-flex",
          marginTop: "30px",
          marginLeft: "+80px",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "start",
        }}
      >
        <div
          id="acousticness"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("acousticness") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[0],
          }}
        >
          Acousticness
        </div>

        <div
          id="danceability"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("danceability") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[1],
          }}
        >
          Danceability
        </div>
        <div
          id="energy"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("energy") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[2],
          }}
        >
          Energy
        </div>
        <div
          id="instrumentalness"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("instrumentalness")
              ? "1"
              : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[3],
          }}
        >
          Instrumentalness
        </div>
        <div
          id="liveness"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("liveness") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[4],
          }}
        >
          Liveness
        </div>
        <div
          id="speechiness"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("speechiness") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[5],
          }}
        >
          Speechiness
        </div>
        <div
          id="valence"
          class="compare-legend"
          onClick={handleSelectedChange}
          style={{
            opacity: selectedAttributes.includes("valence") ? "1" : "0.5",
            marginBottom: "5px",
            backgroundColor: colors[6],
          }}
        >
          Valence
        </div>
      </div>
      <div ref={myRef}></div>
    </>
  );
}
