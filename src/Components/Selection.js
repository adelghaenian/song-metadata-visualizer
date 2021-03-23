import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";

function Selection(props) {
  const myRef = useRef();
  const [rangeValue, setRangeValue] = React.useState([
    props.range_min_value,
    props.range_max_value,
  ]);

  const handleRangeChange = (event, newValue) => {
    let buffer = [...newValue];
    setRangeValue(buffer);
  };

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
    let container = d3.select(myRef.current);
    var svg = container.select("#svgScatterContainer");
    if (svg.empty()) {
      let container = d3.select(myRef.current);
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
        .attr("width", props.device_width - 350)
        .attr("height", props.device_height - 268)
        .append("g")
        .attr("transform", "translate(10,0)");

      // Add X axis
      var x = d3
        .scaleLinear()
        .domain([-3, 5])
        .range([0, props.device_width - 350]);
      svg
        .append("g")
        .attr("transform", "translate(0,0)")
        .call(d3.axisBottom(x))
        .style("opacity", 0);

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([-2, 4.5])
        .range([props.device_height - 380, 0]);
      svg.append("g").call(d3.axisLeft(y)).style("opacity", 0);

      // Add dots
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.X);
        })
        .attr("cy", function (d) {
          return y(d.Y);
        })
        .attr("r", 0)
        .attr("style", function (d) {
          if (props.selected.has(d))
            return `  fill: #75ad86;
          opacity: 1;`;
          else
            return `  fill: #75ada0;
        opacity: 0.5;`;
        });

      svg
        .selectAll("circle")
        .transition() //values after transition
        .delay(function (d, i) {
          return i * 1;
        })
        .duration(1000)
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

          var html =
            "<b>" +
            "-" +
            d.name +
            "</b> <br/>" +
            "(X=" +
            Number.parseFloat(d.X).toPrecision(3) +
            ", Y=" +
            "<span>" +
            Number.parseFloat(d.Y).toPrecision(3) +
            ")</span>";

          tooltip
            .html(html)
            .style("left", event.pageX - 270 + "px")
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
    <div>
      <h2 className="title">
        Select a music from the left list, or select music from the plot. Closer
        nodes (musics) means similarity between musics!
      </h2>

      <div
        ref={myRef}
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
          max={174390}
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
