import { style } from "d3-selection";
import React, { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import playButton from "../assets/play-button.svg";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function ResultList(props) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [addID, setaddID] = React.useState();
  const [token, setToken] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedChange = (s) => {
    props.onSelectedChange(s);
  };

  const handleAddFieldChange = (s) => {
    setaddID(s.target.value);
  };

  useEffect(() => {
    if (!token) getToken();
  }, []);
  const getToken = () => {
    if (token) return;
    var clientID = process.env.REACT_APP_CLIENT_ID;
    var clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientID + ":" + clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);
    });
  };

  const addMusic = (s) => {
    if (!token) {
      getToken();
      return;
    }

    var url = "https://api.spotify.com/v1/audio-features/" + addID;

    fetch("https://api.spotify.com/v1/tracks/" + addID, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json()) // if response is json, for text use res.text()
      .then((response_) => {
        console.log("Response:", response_);
        fetch(url, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => res.json()) // if response is json, for text use res.text()
          .then((response) => {
            setOpen(false);
            console.log("Response:", response);
            var data = {
              id: response.id.toString(),
              name: response_.name.toString(),
              acousticness: response.acousticness.toString(),
              danceability: response.danceability.toString(),
              energy: response.energy.toString(),
              liveness: response.liveness.toString(),
              instrumentalness: response.instrumentalness.toString(),
              tempo: response.tempo.toString(),
              speechiness: response.speechiness.toString(),
              valence: response.valence.toString(),
              X: "-30",
              Y: "-30",
            };
            props.addMusic(data);
          })
          .catch((error) => {
            console.warn("Error:", error);
            setOpen(false);
          });
      })
      .catch((error) => {
        console.warn("Error:", error);
      });
  };

  const searchTerm = props.searchTerm.toLowerCase();
  var results = props.music_data;

  if (props.filterType == "music") {
    results = props.music_data.filter((li) =>
      li.name.toLowerCase().includes(searchTerm)
    );
  } else if (props.filterType == "artist") {
    results = props.music_data.filter((li) =>
      li.artists.toLowerCase().includes(searchTerm)
    );
  } else if (props.filterType == "genre") {
    results = props.music_data.filter((li) =>
      li.genres.toLowerCase().includes(searchTerm)
    );
  }

  // results = results.filter((el) => !props.selected.has(el));
  // results = Array.from(props.selected).concat(results);

  const Row = ({ index, style }) => (
    <div className="test" style={style}>
      <div
        style={{
          display: "-webkit-inline-box",
        }}
        onClick={() => handleSelectedChange(results[index])}
        className={
          props.selected.has(results[index])
            ? "song-selected"
            : "song-notselected"
        }
      >
        <p
          style={{
            width: "3em",
            textAlign: "left",
          }}
        >
          {props.filterType == "music" ? (
            <img
              className="play-button"
              height="25"
              src={playButton}
              alt="P"
              onClick={(e) => {
                e.stopPropagation();
                props.onPreviewChange(results[index].id);
              }}
            />
          ) : (
            <div> </div>
          )}
        </p>
        <div class="text ellipsis">
          <span class="text-concat song-text">
            {results[index].name && results[index].name}
            {results[index].artists && results[index].artists}
            {results[index].genres && results[index].genres}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {location.pathname === "/compare" && props.filterType === "music" ? (
        <div
          onClick={handleClickOpen}
          className="add-music"
          style={{
            borderColor: "#ffffff",
            height: "50px",
            margin: "5px",
            marginLeft: "18px",
            marginRight: "18px",
            opacity: "0.4",
          }}
        >
          <p
            style={{
              color: "#ffffff",
              fontSize: "32px",
              marginTop: "-18px",
              fontWeight: "lighter",
            }}
          >
            +
          </p>
        </div>
      ) : (
        <></>
      )}

      <List
        width={340}
        height={
          location.pathname === "/compare"
            ? props.device_height - 403
            : props.device_height - 323
        }
        itemCount={results.length}
        itemSize={55}
      >
        {Row}
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Missing Music</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a missing music to compare, copy the music id from Spotify
            here
          </DialogContentText>
          <p
            style={{
              fontWeight: "lighter",
              fontSize: "16px",
              color: "#979797",
            }}
          >
            The Spotify music IDs are like: 6wX3aeg2vMBAFB0ubaraLb
          </p>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Spotify Music ID"
            type="string"
            onChange={handleAddFieldChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addMusic} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
