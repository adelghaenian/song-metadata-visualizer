import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import axios from 'axios';
import { styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@material-ui/core/Box";
export default function Prediction(props) {
    const Input = styled(MuiInput)`
    width: 42px;
  `;
    const [acousticness, set_acousticness] = React.useState(0.5);
    const [danceability, set_danceability] = React.useState(0.5);
    const [duration_ms, set_duration_ms] = React.useState(0.5);
    const [energy, set_energy] = React.useState(0.5);
    const [instrumentalness, set_instrumentalness] = React.useState(0.5);
    const [key, set_key] = React.useState(1);
    const [liveness, set_liveness] = React.useState(0.5);
    const [loudness, set_loudness] = React.useState(0.5);
    const [mode, set_mode] = React.useState(1);
    const [speechiness, set_speechiness] = React.useState(0.5);
    const [tempo, set_tempo] = React.useState(0.5);
    const [valence, set_valence] = React.useState(0.5);
    const [count, set_count] = React.useState(0.5);

    const [popularity_score, set_popularity_score] = React.useState("-");
    const [category, set_category] = React.useState("-");
    const [elevation, set_elevation] = React.useState(0);

    const [song_or_artist, set_song_or_artist] = React.useState("song");
    const [model, set_model] = React.useState("rf_model");
    const handleBlur = () => {
        // if (value < 0) {
        //     setValue(0);
        // } else if (value > 1) {
        //     setValue(1);
        // }
    };

    function FeatureSlider(props) {
        var feature = props.feature
        return (
            <>
                <br />
                <Typography sx={{ mb: 1 }} color="#f6f6f6">
                    {feature}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs>
                        <Slider
                            {...(feature == "acousticness" ? { value: acousticness } : {})}
                            {...(feature == "danceability" ? { value: danceability } : {})}
                            {...(feature == "duration_ms" ? { value: duration_ms } : {})}
                            {...(feature == "energy" ? { value: energy } : {})}
                            {...(feature == "instrumentalness" ? { value: instrumentalness } : {})}
                            {...(feature == "key" ? { value: key } : {})}
                            {...(feature == "liveness" ? { value: liveness } : {})}
                            {...(feature == "loudness" ? { value: loudness } : {})}
                            {...(feature == "mode" ? { value: mode } : {})}
                            {...(feature == "speechiness" ? { value: speechiness } : {})}
                            {...(feature == "tempo" ? { value: tempo } : {})}
                            {...(feature == "valence" ? { value: valence } : {})}
                            {...(feature == "count" ? { value: count } : {})}

                            onChangeCommitted={(event, newValue) => {
                                if (feature == "acousticness")
                                    set_acousticness(newValue);
                                if (feature == "danceability")
                                    set_danceability(newValue);
                                if (feature == "duration_ms")
                                    set_duration_ms(newValue);
                                if (feature == "energy")
                                    set_energy(newValue);
                                if (feature == "instrumentalness")
                                    set_instrumentalness(newValue);
                                if (feature == "key")
                                    set_key(newValue);
                                if (feature == "liveness")
                                    set_liveness(newValue);
                                if (feature == "loudness")
                                    set_loudness(newValue);
                                if (feature == "mode")
                                    set_mode(newValue);
                                if (feature == "speechiness")
                                    set_speechiness(newValue);
                                if (feature == "tempo")
                                    set_tempo(newValue);
                                if (feature == "valence")
                                    set_valence(newValue);
                                if (feature == "count")
                                    set_count(newValue);
                            }}
                            aria-labelledby="input-slider"
                            min={0}
                            max={1}
                            {...((feature == "mode" || feature == "key") ? { step: 1 } : { step: 0.01 })}
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            style={{ width: "50px", color: "#fff" }}
                            size="large"
                            {...(feature == "acousticness" ? { value: acousticness } : {})}
                            {...(feature == "danceability" ? { value: danceability } : {})}
                            {...(feature == "duration_ms" ? { value: duration_ms } : {})}
                            {...(feature == "energy" ? { value: energy } : {})}
                            {...(feature == "instrumentalness" ? { value: instrumentalness } : {})}
                            {...(feature == "key" ? { value: key } : {})}
                            {...(feature == "liveness" ? { value: liveness } : {})}
                            {...(feature == "loudness" ? { value: loudness } : {})}
                            {...(feature == "mode" ? { value: mode } : {})}
                            {...(feature == "speechiness" ? { value: speechiness } : {})}
                            {...(feature == "tempo" ? { value: tempo } : {})}
                            {...(feature == "valence" ? { value: valence } : {})}
                            {...(feature == "count" ? { value: count } : {})}
                            onChange={(event) => {
                                var newValue = Number(event.target.value)
                                if (feature == "acousticness")
                                    set_acousticness(newValue);
                                if (feature == "danceability")
                                    set_danceability(newValue);
                                if (feature == "duration_ms")
                                    set_duration_ms(newValue);
                                if (feature == "energy")
                                    set_energy(newValue);
                                if (feature == "instrumentalness")
                                    set_instrumentalness(newValue);
                                if (feature == "key")
                                    set_key(newValue);
                                if (feature == "liveness")
                                    set_liveness(newValue);
                                if (feature == "loudness")
                                    set_loudness(newValue);
                                if (feature == "mode")
                                    set_mode(newValue);
                                if (feature == "speechiness")
                                    set_speechiness(newValue);
                                if (feature == "tempo")
                                    set_tempo(newValue);
                                if (feature == "valence")
                                    set_valence(newValue);
                                if (feature == "count")
                                    set_count(newValue);

                            }}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 0.01,
                                min: 0,
                                max: 1,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }

    function predict() {

        fetch('https://spotifysongapi.herokuapp.com/popularity_predict?acousticness=' + acousticness
            + "&" + "danceability=" + danceability
            + "&" + "duration_ms=" + duration_ms
            + "&" + "energy=" + energy
            + "&" + "instrumentalness=" + instrumentalness
            + "&" + "key=" + key
            + "&" + "liveness=" + liveness
            + "&" + "loudness=" + loudness
            + "&" + "speechiness=" + speechiness
            + "&" + "tempo=" + tempo
            + "&" + "valence=" + valence
            + "&" + "model=" + model
            + "&" + "count=" + count
            + "&" + "song_or_artist=" + song_or_artist
        )
            .then(response => response.json())
            .then(data => {
                set_popularity_score(data)
                set_elevation(15)
                console.log(data);
            });


        axios('https://spotifysongapi.herokuapp.com/genre_predict?acousticness=' + acousticness
            + "&" + "danceability=" + danceability
            + "&" + "duration_ms=" + duration_ms
            + "&" + "energy=" + energy
            + "&" + "instrumentalness=" + instrumentalness
            + "&" + "key=" + key
            + "&" + "mode=" + mode
            + "&" + "liveness=" + liveness
            + "&" + "loudness=" + loudness
            + "&" + "speechiness=" + speechiness
            + "&" + "tempo=" + tempo
            + "&" + "valence=" + valence
        )
            .then(resp => set_category(resp.data))
    }
    return (

        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={window.innerHeight - 100}
        >
            <div justifyContent="center">
                <div style={{ display: "-webkit-inline-flex" }}>
                    <Card style={{ backgroundColor: "#121212" }}>
                        <CardContent>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Song / Artist</InputLabel>
                                <Select
                                    style={{ color: "white" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={song_or_artist}
                                    label="Song or Artist"
                                    onChange={(event) => {
                                        set_song_or_artist(event.target.value);
                                    }}
                                >
                                    <MenuItem value={"song"}>Song</MenuItem>
                                    <MenuItem value={"artist"}>Artist</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <Typography variant="h5" component="div" color="#f1f1f1">
                                {song_or_artist} Features
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="#818181">
                                Please adjust song features to predict
                            </Typography>

                            <div style={{ display: "-webkit-inline-flex", width: "600px" }}>
                                <div style={{ width: "250px" }}>
                                    <FeatureSlider feature={"acousticness"} ></FeatureSlider>
                                    <FeatureSlider feature={"danceability"} ></FeatureSlider>
                                    <FeatureSlider feature={"duration_ms"} ></FeatureSlider>
                                    <FeatureSlider feature={"energy"} ></FeatureSlider>
                                    <FeatureSlider feature={"instrumentalness"} ></FeatureSlider>
                                    <FeatureSlider feature={"key"} ></FeatureSlider>
                                    {
                                        song_or_artist == "artist" &&
                                        <FeatureSlider feature={"count"} ></FeatureSlider>
                                    }
                                </div>
                                <div style={{ width: "250px", marginLeft: "50px" }}>

                                    <FeatureSlider feature={"liveness"} ></FeatureSlider>
                                    <FeatureSlider feature={"loudness"} ></FeatureSlider>
                                    <FeatureSlider feature={"mode"} ></FeatureSlider>
                                    <FeatureSlider feature={"speechiness"} ></FeatureSlider>
                                    <FeatureSlider feature={"tempo"} ></FeatureSlider>
                                    <FeatureSlider feature={"valence"} ></FeatureSlider>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div style={{ marginLeft: "50px" }}>
                        <Card style={{ backgroundColor: "#121212" }}>

                            <CardContent>
                                <Typography variant="h5" component="div" color="#f1f1f1">
                                    Prediction Model
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="#818181">
                                    Please select the population prediction model
                                </Typography>

                                <br></br>
                                <br></br>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                                    <Select
                                        style={{ color: "white" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={model}
                                        label="Model"
                                        onChange={(event) => {
                                            set_model(event.target.value);
                                        }}
                                    >
                                        <MenuItem value={"rf_model"}>Random Forest (accuracy: 71%)</MenuItem>
                                        <MenuItem value={"svm_model"}>SVM (accuracy: 62%)</MenuItem>
                                        <MenuItem value={"lr_model"}>Linear Regression (accuracy: 44%)</MenuItem>
                                    </Select>
                                </FormControl>

                            </CardContent>
                        </Card>
                        <Card elevation={elevation} style={{ marginTop: "30px", backgroundColor: "#121212", width: "400px", height: "300px" }}  >
                            <CardContent>
                                <Typography variant="h5" component="div" color="#f1f1f1">
                                    Popularity Score:
                                </Typography>
                                <Typography variant="h1" component="div" color="#fff" style={{ textAlign: "center" }}>
                                    {Number(popularity_score).toFixed(2).toString()}{popularity_score !== "-" && <span style={{ fontSize: "26px", color: "#d1d1d1" }}>/100</span>}
                                </Typography>


                                <Typography variant="h5" component="div" color="#f1f1f1">
                                    Category:
                                </Typography>
                                <Typography variant="h3" component="div" color="#fff" style={{ textAlign: "center" }}>
                                    {category}
                                </Typography>

                            </CardContent>
                        </Card>
                        <Card style={{ marginTop: "30px" }}>
                            <Button variant="contained" style={{ width: "400px", height: "60px" }} onClick={() => { predict() }}>PREDICT</Button>
                        </Card>
                    </div>
                </div>
            </div >
        </Box>

    );
}
