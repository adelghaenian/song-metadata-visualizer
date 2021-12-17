import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import year_data from "../dataset/data_by_year.csv";
import { color } from "d3";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GenreOverYears from './GenreOverYears'
import BubbleChart from './BubbleChart'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import PieArtist from './PieArtist'
export default function General(props) {
    const overyearsRef = useRef();
    const overyearsGenreRef = useRef();
    const colors = d3["schemeTableau10"];

    const [x_axis, set_x_axis] = React.useState("danceability");
    const [y_axis, set_y_axis] = React.useState("valence");
    const [bubble_color, set_color] = React.useState("acousticness");
    const [bubble_size, set_bubble] = React.useState("instrumentalness");
    const [selectedYear, setSelectedYear] = React.useState(1980);

    var selectedAttributes = props.selectedAttributes;
    var handleSelectedChange = props.handleAttributesChange;

    useEffect(() => {
        let container = d3.select(overyearsRef.current);
        let overyearsGenreContainer = d3.select(overyearsGenreRef.current);
        var margin = {
            top: 20,
            right: 40,
            bottom: 30,
            left: 50,
        },
            width = props.device_width - margin.left - margin.right,
            height = props.device_height - 200 - margin.bottom - 250;

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

        //process the pie chart
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
                        .transition()
                        .duration(2500)
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
                svg
                    .append("g")
                    .call(d3.axisLeft(y).ticks(2))
                    .selectAll("text")
                    .attr("x", -20)
                    .attr("fill", "#fff")
                    .attr("opacity", "0.2")
                    .attr("dy", ".35em")
                    .style("text-anchor", "start");
            });
        }
    }, [selectedAttributes]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#101010",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            color: theme.palette.common.white,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function createData(name, danceability, energy, liveness, speechiness, tempo, valence, popularity) {
        danceability = Math.round(danceability * 1000) / 1000
        energy = Math.round(energy * 1000) / 1000
        liveness = Math.round(liveness * 1000) / 1000
        speechiness = Math.round(speechiness * 1000) / 1000
        tempo = Math.round(tempo * 1000) / 1000
        valence = Math.round(valence * 1000) / 1000
        return { name, danceability, energy, liveness, speechiness, tempo, valence, popularity };
    }

    const rows = [
        createData('Nowhere To Run', Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * 100)),
        createData('It Was A Very Good Year', Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * 100)),
        createData('Do-Re-Mi', Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * 100)),
        createData('I Found You', Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * 100)),
        createData('High Power', Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.floor(Math.random() * 100)),
    ];
    return (
        <div>
            <h2 className="title">The dataset is like:</h2>
            <div style={{ width: "100vw" }}>
                <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "auto" }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Danceability</StyledTableCell>
                                <StyledTableCell align="right">Energy</StyledTableCell>
                                <StyledTableCell align="right">Liveness</StyledTableCell>
                                <StyledTableCell align="right">Speechiness</StyledTableCell>
                                <StyledTableCell align="right">Tempo</StyledTableCell>
                                <StyledTableCell align="right">Valence</StyledTableCell>
                                <StyledTableCell align="right">Popularity</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.danceability}</StyledTableCell>
                                    <StyledTableCell align="right">{row.energy}</StyledTableCell>
                                    <StyledTableCell align="right">{row.liveness}</StyledTableCell>
                                    <StyledTableCell align="right">{row.speechiness}</StyledTableCell>
                                    <StyledTableCell align="right">{row.tempo}</StyledTableCell>
                                    <StyledTableCell align="right">{row.valence}</StyledTableCell>
                                    <StyledTableCell align="right">{row.popularity}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <h2 className="title">Music feature changes over the years (1920 - 2021)</h2>
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

            <div ref={overyearsRef}> </div>
            <hr></hr>
            <div style={{ display: "-webkit-inline-flex" }}>
                <div>
                    <h2 className="title">Number of songs in specific genre per year</h2>
                    <GenreOverYears device_width={props.device_width / 2} device_height={props.device_height - 250}></GenreOverYears>
                </div>
                <div>
                    <h2 className="title">Number of artists per genre</h2>
                    <PieArtist device_width={props.device_width / 2} device_height={props.device_height - 250}></PieArtist>
                </div>
            </div>
            <br />
            <br />
            <h2 className="title">Bubble chart visualization</h2>
            <br />
            <div style={{ display: "-webkit-inline-flex", }}>
                <BubbleChart selectedYear={selectedYear} bubble_size={bubble_size} bubble_color={bubble_color} x_axis={x_axis} y_axis={y_axis} device_height={props.device_height} device_width={props.device_width} music_data={props.music_data}></BubbleChart>

                <div style={{ display: "block", marginLeft: "50px" }}>

                    <FormGroup>
                        <InputLabel style={{ marginTop: "20px", color: "gray" }} id="demo-simple-select-label">Axis X</InputLabel>
                        <Select
                            style={{ color: "white" }}
                            native={false}
                            value={x_axis}
                            label="Axis X"
                            onChange={(event) => {
                                set_x_axis(event.target.value);
                            }}
                        >
                            <MenuItem value={"acousticness"}>acousticness</MenuItem>
                            <MenuItem value={"danceability"}>danceability</MenuItem>
                            <MenuItem value={"energy"}>energy</MenuItem>
                            <MenuItem value={"instrumentalness"}>instrumentalness</MenuItem>
                            <MenuItem value={"liveness"}>liveness</MenuItem>
                            <MenuItem value={"speechiness"}>speechiness</MenuItem>
                            <MenuItem value={"tempo"}>tempo</MenuItem>
                            <MenuItem value={"valence"}>valence</MenuItem>
                        </Select>


                        <InputLabel style={{ marginTop: "20px", color: "gray" }} id="demo-simple-select-label">Axis Y</InputLabel>
                        <Select
                            style={{ color: "white" }}
                            value={y_axis}
                            label="Axis Y"
                            onChange={(event) => {
                                set_y_axis(event.target.value);
                            }}
                        >
                            <MenuItem value={"acousticness"}>acousticness</MenuItem>
                            <MenuItem value={"danceability"}>danceability</MenuItem>
                            <MenuItem value={"energy"}>energy</MenuItem>
                            <MenuItem value={"instrumentalness"}>instrumentalness</MenuItem>
                            <MenuItem value={"liveness"}>liveness</MenuItem>
                            <MenuItem value={"speechiness"}>speechiness</MenuItem>
                            <MenuItem value={"tempo"}>tempo</MenuItem>
                            <MenuItem value={"valence"}>valence</MenuItem>
                        </Select>


                        <InputLabel style={{ marginTop: "20px", color: "gray" }} id="demo-simple-select-label">Bubble Size</InputLabel>
                        <Select
                            style={{ color: "white" }}
                            value={bubble_size}
                            label="Bubble size"
                            onChange={(event) => {
                                set_bubble(event.target.value);
                            }}
                        >
                            <MenuItem value={"acousticness"}>acousticness</MenuItem>
                            <MenuItem value={"danceability"}>danceability</MenuItem>
                            <MenuItem value={"duration_ms"}>duration_ms</MenuItem>
                            <MenuItem value={"energy"}>energy</MenuItem>
                            <MenuItem value={"instrumentalness"}>instrumentalness</MenuItem>
                            <MenuItem value={"key"}>key</MenuItem>
                            <MenuItem value={"liveness"}>liveness</MenuItem>
                            <MenuItem value={"mode"}>mode</MenuItem>
                            <MenuItem value={"speechiness"}>speechiness</MenuItem>
                            <MenuItem value={"tempo"}>tempo</MenuItem>
                            <MenuItem value={"valence"}>valence</MenuItem>
                        </Select>


                        <InputLabel style={{ marginTop: "20px", color: "gray" }} id="demo-simple-select-label">Bubble Color</InputLabel>
                        <Select
                            style={{ color: "white" }}
                            value={bubble_color}
                            label="Bubble color"
                            onChange={(event) => {
                                set_color(event.target.value);
                            }}
                        >
                            <MenuItem value={"acousticness"}>acousticness</MenuItem>
                            <MenuItem value={"danceability"}>danceability</MenuItem>
                            <MenuItem value={"duration_ms"}>duration_ms</MenuItem>
                            <MenuItem value={"energy"}>energy</MenuItem>
                            <MenuItem value={"instrumentalness"}>instrumentalness</MenuItem>
                            <MenuItem value={"key"}>key</MenuItem>
                            <MenuItem value={"liveness"}>liveness</MenuItem>
                            <MenuItem value={"mode"}>mode</MenuItem>
                            <MenuItem value={"speechiness"}>speechiness</MenuItem>
                            <MenuItem value={"tempo"}>tempo</MenuItem>
                            <MenuItem value={"valence"}>valence</MenuItem>
                        </Select>
                    </FormGroup>
                    <div className="grad">
                        <div style={{ color: "white", marginLeft: "10px" }}>0</div>
                        <div style={{ color: "white", marginLeft: "160px" }}>1</div>
                    </div>
                    <Stack style={{ marginTop: "35px" }} sx={{ height: 300 }} spacing={1} direction="row">
                        <Slider
                            orientation="vertical"
                            min={1920}
                            max={2020}
                            defaultValue={selectedYear}
                            onChange={(event, newValue) => {
                                setSelectedYear(newValue);
                            }}
                        />
                        <div style={{ color: "white", fontSize: "30px" }}>{selectedYear}</div>
                    </Stack>

                </div>
            </div>
        </div >
    );
}
