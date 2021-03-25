import React, { useEffect, useRef } from "react";
import RadarChart from "react-svg-radar-chart";
import * as d3 from "d3";
import { select, axisBottom, axisRight, scaleLinear } from "d3";
import "../Styles/compareChart.css";
import barIcon from "../assets/bar.svg";
import radarIcon from "../assets/radar.svg";

function Compare(props) {
  const handleChartType = (event) => {
    props.setChartTypeValue(event.target.id);
  };
  var adjusted_data = [];
  const colors = d3["schemeTableau10"];
  const myRef = useRef();
  const barRef = useRef();
  const defaultOptions = {
    axes: true, // show axes?
    scales: 1, // show scale circles?
    captions: true, // show captions?
    captionMargin: 35,
    dots: true, // show dots?
    zoomDistance: 1.3, // where on the axes are the captions?
    setViewBox: (options) =>
      `-${options.captionMargin} 0 ${
        options.size + options.captionMargin * 2
      } ${options.size}`, // custom viewBox ?
    // smoothing: noSmoothing, // shape smoothing function
    axisProps: () => ({
      className: "axis",
    }),
    scaleProps: () => ({
      className: "scale",
      fill: "none",
    }),
    shapeProps: () => ({
      className: "shape",
      mouseEnter: (shape) => {},
      mouseLeave: (shape) => {},
    }),
    captionProps: () => ({
      className: "caption",
      textAnchor: "middle",
      fontSize: 10,
      fontFamily: "sans-serif",
    }),
    dotProps: () => ({
      className: "dot",
    }),
  };
  const handleSelectedChange = function (d) {
    props.onSelectedChange(d);
  };
  var selected_data = props.selected;
  var counter = 0;
  selected_data.forEach((s) => {
    adjusted_data.push({
      data: {
        acousticness: Number(s["acousticness"]),
        danceability: Number(s["danceability"]),
        energy: Number(s["energy"]),
        instrumentalness: Number(s["instrumentalness"]),
        liveness: Number(s["liveness"]),
        speechiness: Number(s["speechiness"]),
        valence: Number(s["valence"]),
      },
      meta: {
        color: colors[counter % 10],
      },
    });
    counter = counter + 1;
  });
  useEffect(() => {
    let container = d3.select(myRef.current);
    var svg = container.select("#svgCompareLegendsContainer");
    const bars_height = props.device_width - 580;
    const bars_margin = 10;
    const bars_x_margin = 100;
    let bar_container = d3.select(barRef.current);
    var svg_bar_container = bar_container.append("g");
    svg_bar_container.attr("transform", "translate(50,60)");

    for (var i = 0; i < 8; i = i + 1) {}
    svg_bar_container
      .selectAll("accoustic_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.acousticness * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + bars_margin;
      });
    svg_bar_container
      .selectAll("accoustic_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("acousticness")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + bars_margin + 3;
      });

    svg_bar_container
      .selectAll("danceability_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.danceability * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 2 * bars_margin;
      });

    svg_bar_container
      .selectAll("danceability_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("danceability")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 2 * bars_margin + 3;
      });

    svg_bar_container
      .selectAll("energy_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.energy * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 3 * bars_margin;
      });
    svg_bar_container
      .selectAll("energy_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("energy")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 3 * bars_margin + 3;
      });

    svg_bar_container
      .selectAll("instrumentalness_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.instrumentalness * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 4 * bars_margin;
      });
    svg_bar_container
      .selectAll("instrumentalness_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("instrumentalness")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 4 * bars_margin + 3;
      });

    svg_bar_container
      .selectAll("liveness_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.liveness * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 5 * bars_margin;
      });
    svg_bar_container
      .selectAll("liveness_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("liveness")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 5 * bars_margin + 3;
      });

    svg_bar_container
      .selectAll("speechiness_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.speechiness * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 6 * bars_margin;
      });
    svg_bar_container
      .selectAll("speechiness_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("speechiness")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 6 * bars_margin + 3;
      });

    svg_bar_container
      .selectAll("valence_bars")
      .data(props.selected)
      .enter()
      .append("rect")
      .attr("width", function (d, i) {
        return d.valence * bars_height;
      })
      .attr("height", 5)
      .attr("fill", function (d, i) {
        return colors[i % 10];
      })
      .attr("x", bars_x_margin)
      .attr("y", function (d, i) {
        return i * 90 + 7 * bars_margin;
      });

    svg_bar_container
      .selectAll("valence_bars_text")
      .data(props.selected)
      .enter()
      .append("text")
      .text("valence")
      .attr("font-size", "0.6em")
      .attr("fill", function (d, i) {
        return "#787878";
      })
      .attr("x", bars_x_margin - 100)
      .attr("y", function (d, i) {
        return i * 90 + 7 * bars_margin + 3;
      });

    if (svg.empty()) {
      container
        .selectAll("legend")
        .data(props.selected)
        .enter()
        .append("div")
        .attr("class", "compare-legend")
        .style("opacity", 0.5)
        .style("margin-bottom", "5px")
        .style("background-color", function (d, i) {
          return colors[i % 10];
        })
        .text(function (d) {
          if (d.genres) {
            return d.genres;
          } else if (d.name) {
            return d.name;
          } else if (d.artists) {
            return d.artists;
          } else return "data problem?!";
        });

      container
        .selectAll(".compare-legend")
        .on("click", function (event, d) {
          handleSelectedChange(d);
        })

        .on("mouseover", function (event, d) {
          d3.select(this).transition().duration(200).style("opacity", 1);
        });

      container
        .selectAll(".compare-legend")
        .on("mouseout", function (event, d) {
          d3.select(this).transition().duration(200).style("opacity", 0.5);
        });
    }
  }, [props.selected]);

  return (
    <div
      style={{
        paddingLeft: "20em",
      }}
    >
      <div className="row">
        <div className="col-md-4">
          <h2 className="title"> Select musics from the list to compare. </h2>
        </div>
        <div className="col-md-6"> </div>
        <div className="col-md-2">
          <div
            style={{
              display: "-webkit-inline-flex",
              marginTop: "50px",
            }}
          >
            <img
              style={{
                textAlign: "right",
                opacity: props.chartTypeValue == "radar" ? "1" : "0.2",
              }}
              src={radarIcon}
              onClick={handleChartType}
              alt="radar"
              id="radar"
            />
            <img
              id="bar"
              style={{
                textAlign: "right",
                marginLeft: "20px",
                opacity: props.chartTypeValue == "bar" ? "1" : "0.2",
              }}
              src={barIcon}
              onClick={handleChartType}
              alt="bar"
            />
          </div>
        </div>
      </div>
      {props.chartTypeValue == "radar" ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "-48px",
          }}
        >
          <RadarChart
            options={defaultOptions}
            captions={{
              acousticness: "Acousticness",
              danceability: "Danceability",
              energy: "Energy",
              instrumentalness: "Instrumentalness",
              liveness: "Liveness",
              speechiness: "Speechiness",
              valence: "Valence",
            }}
            data={adjusted_data}
            size={props.device_height - 200}
          />
        </div>
      ) : (
        <svg
          width="100%"
          height={props.device_height - 250}
          ref={barRef}
          id={"svgBarChartContainer"}
        >
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      )}
      <div
        ref={myRef}
        id={"svgCompareLegendsContainer"}
        style={{
          display: "-webkit-inline-flex",
          marginTop: "-30px",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "start",
        }}
      ></div>
    </div>
  );
}

function areEqual(prevProps, nextProps) {
  console.log(prevProps === nextProps);
}
export default React.memo(Compare, areEqual);
