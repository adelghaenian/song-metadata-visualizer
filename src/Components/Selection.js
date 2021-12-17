import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { nest } from 'd3-collection';
function Selection(props) {
  const selectionRef = useRef();
  const [rangeValue, setRangeValue] = React.useState([
    props.range_min_value,
    props.range_max_value,
  ]);

  const handleRangeChange = (event, newValue) => {
    let buffer = [...newValue];
    setRangeValue(buffer);
  };
  const colors = {
    selected: [],
    notSelected: d3["schemeTableau10"]
  }
  const handleRangeChangeConfirmed = () => {
    if (rangeValue[1] - rangeValue[0] >= 5000) {
      window.alert(
        "Your selected range cointains more than 5000 musics. It can affect the performance!"
      );
    }
    props.onRangeChange(rangeValue);
  };

  const handleSelectedChange = function (d) {
    props.onSelectedChange(d);
  };
  useEffect(() => {
    let container = d3.select(selectionRef.current);
    var svg = container.select("#svgScatterContainer");
    if (svg.empty()) {
      let container = d3.select(selectionRef.current);
      var data = props.music_data.slice(
        props.range_min_value,
        props.range_max_value
      );

      props.selected.forEach((s) => {
        if (!data.includes(s)) {
          data.push(s);
        }
      });

      svg = container
        .append("svg")
        .attr("id", "svgScatterContainer")
        .attr("width", props.device_width - 650)
        .attr("height", props.device_height - 268)
        .call(
          d3.zoom().on("zoom", (event) => {
            svg.attr("transform", event.transform);
          })
        )
        .append("g")
        .attr("transform", "translate(10,0)");

      var defs = svg.append("defs");

      //Filter for the outside glow
      var filter = defs.append("filter").attr("id", "glow");
      filter
        .append("feGaussianBlur")
        .attr("stdDeviation", "1.2")
        .attr("result", "coloredBlur");
      var feMerge = filter.append("feMerge");
      feMerge.append("feMergeNode").attr("in", "coloredBlur");
      feMerge.append("feMergeNode").attr("in", "SourceGraphic");

      // Add X axis
      var x, y
      if (props.rDimensionMethod === "pca") {
        x = d3
          .scaleLinear()
          .domain([-1, 1.5])
          .range([0, props.device_width - 550]);

        y = d3
          .scaleLinear()
          .domain([-.5, 1.2])
          .range([props.device_height - 380, 0]);
      } else {
        x = d3
          .scaleLinear()
          .domain([-55, 65])
          .range([0, props.device_width - 550]);

        y = d3
          .scaleLinear()
          .domain([-45, 55])
          .range([props.device_height - 380, 0]);
      }

      svg
        .append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisBottom(x))
        .style("opacity", 0);
      svg.append("g").call(d3.axisLeft(y)).style("opacity", 0);



      var nested = nest()
        .key(function (d) {
          if (props.classificationMethod === "kmeans")
            return d.kmeans;
          if (props.classificationMethod === "hierarchical")
            if (props.hierarchicalMethod === "ward")
              return d.ward;
          if (props.hierarchicalMethod === "average")
            return d.average;
          if (props.hierarchicalMethod === "single")
            return d.single;
          if (props.hierarchicalMethod === "complete")
            return d.complete;
        })
        .rollup(function (d) {
          return d.map(function (v) {
            if (props.rDimensionMethod === "tsne")
              return [x(v.tsne1), y(v.tsne2)];
            if (props.rDimensionMethod === "pca")
              return [x(v.pca1), y(v.pca2)];
          });
        })
        .entries(data);

      if (props.convexHullsChecked) {

        svg
          .append("g")
          .attr("class", "hulls")
          .selectAll("polygon")
          .data(nested)
          .enter()
          .append("polygon")
          .attr("opacity", 0.03)
          .attr("stroke-width", 30)
          .attr("stroke-linejoin", "round")
          .attr("fill", function (d) {
            return colors.notSelected[d.key];
          })
          .attr("stroke", function (d) {
            return colors.notSelected[d.key];
          })
          .attr("points", function (d) {
            return d3.polygonHull(d.value);
          });


        svg
          .selectAll("polygon")
          .on("mouseover", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style("opacity", .15)
          })
          .on("mouseout", function (event, d) {
            d3.select(this)
              .transition()
              .duration(200)
              .style("opacity", .03)
          })




      }
      var legend = svg
        .selectAll(".legend")
        .data(nested)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

      legend
        .append("rect")
        .attr("x", props.device_width - 680 - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function (d) {
          return colors.notSelected[d.key]
        });

      legend
        .append("text")
        .attr("x", props.device_width - 680 - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .style("fill", "white ")
        .text(function (d) {
          if (
            d !== -1)
            return "Class " + d.key;
          return "Class undefined";
        });

      // Add dots

      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          if (props.rDimensionMethod === "tsne")
            return x(d.tsne1);
          else if (props.rDimensionMethod === "pca") {
            return x(d.pca1);
          }
        })
        .attr("cy", function (d) {
          if (props.rDimensionMethod === "tsne")
            return y(d.tsne2);
          else if (props.rDimensionMethod === "pca")
            return y(d.pca2);
        })
        .attr("r", 0)
        .attr("style", function (d) {
          var col

          if (props.classificationMethod === "kmeans") {
            col = colors.notSelected[d.kmeans]
          } else if (props.classificationMethod === "optics") {
            // col = colors.notSelected[d.optics] //
          } else if (props.classificationMethod === "hierarchical") {
            switch (props.hierarchicalMethod) {
              case "ward":
                col = colors.notSelected[d.ward]
                if (d.ward == -1) col = "#ffffff"
                break;
              case "complete":
                col = colors.notSelected[d.complete]
                if (d.complete == -1) col = "#ffffff"
                break;
              case "average":
                col = colors.notSelected[d.average]
                if (d.average == -1) col = "#ffffff"
                break;
              case "single":
                col = colors.notSelected[d.single]
                if (d.single == -1) col = "#ffffff"
                break;
              default:
                break;
            }
          }

          if (props.selected.has(d))
            return `  fill: ` + col + `;
                  opacity: 1;`;
          else
            return `  fill: ` + col + `;
                  opacity: 0.5;`;
        });

      svg
        .selectAll("circle")
        .transition() //values after transition
        .delay(function (d, i) {
          return i * 0.5;
        })
        .duration(1000)
        .style("filter", function (d, i) {
          if (props.selected.has(d)) {
            return "url(#glow)";
          } else {
            return "";
          }
        })
        .attr("fill", function (d, i) {
          if (props.selected.has(d)) {
            return "#43D38E";
          } else {
            return "#8dac96";
          }
        })
        .attr("r", function (d, i) {
          if (props.selected.has(d)) {
            return 8;
          } else {
            return 2;
          }
        });

      svg
        .selectAll("circle")
        .on("click", function (e, d) {
          handleSelectedChange(d);
        })

        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", 8)
            .style("opacity", 1);

          var X, Y
          if (props.rDimensionMethod === "tsne") {
            X = d.tsne1
            Y = d.tsne2
          }
          else if (props.rDimensionMethod === "pca") {
            X = d.pca1
            Y = d.pca2
          }
          var html =
            "<b>" +
            "-" +
            d.name +
            "</b> <br/>" +
            "(X=" +
            Number.parseFloat(X).toPrecision(3) +
            ", Y=" +
            "<span>" +
            Number.parseFloat(Y).toPrecision(3) +
            ")</span>";

          tooltip
            .html(html)
            .style("left", event.pageX + 38 + "px")
            .style("top", event.pageY - 28 + "px")
            .transition()
            .duration(500) // ms
            .style("opacity", 0.9); // started as 0!
        })
        .on("mouseout", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", "scale(1)");

          if (!props.selected.has(d)) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr("r", function (e) {
                if (!props.selected.has(d)) {
                  return 2;
                }
              });
          }

          tooltip
            .transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
        });
      //adding tt
      var tooltip = container
        .append("div")
        .attr("class", "tooltip")
        .style("padding", "10px")
        .style("opacity", 0);
    }
  }, [props.range_min_value, props.range_max_value]);

  return (
    <div
      style={{
        paddingLeft: "20em",
      }}
    >
      <h2 className="title">
        Select a music from the left list, or select music from the plot. Closer
        nodes (musics) means similarity between musics!
      </h2>

      <div
        ref={selectionRef}
        id={"scatterContainer"}
        style={{ height: props.device_height - 268 }}
      ></div>

      <div style={{ display: "-webkit-inline-flex", marginTop: "+10px" }}>
        <Slider
          style={{ width: "" + (props.device_width - 750) + "px" }}
          className="range-slider"
          value={rangeValue}
          min={0}
          step={250}
          max={69750}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Button
          color="secondary"
          onClick={handleRangeChangeConfirmed}
          style={{ marginLeft: "30px", marginTop: "-5px" }}
        >
          Change Music Range
        </Button>
      </div>
    </div>
  );
}
function areEqual(prevProps, nextProps) {
  console.log(prevProps === nextProps);
}
export default React.memo(Selection, areEqual);
