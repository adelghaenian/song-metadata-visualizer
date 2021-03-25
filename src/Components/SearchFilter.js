import React from "react";
import "../Styles/SearchFilter.css";
import { useLocation } from "react-router-dom";

function valuetext(value) {
  return `${value}°C`;
}

export default function SearchFilter(props) {
  const location = useLocation();
  return (
    <div>
      {location.pathname === "/compare" ? (
        <div className="radio-toolbar">
          <input
            type="radio"
            id="radioMusic"
            name="filter"
            value="music"
            defaultChecked
          />
          <label for="radioMusic">Music</label>

          <input
            type="radio"
            id="radioArtist"
            name="filter"
            value="artist"
            value={props.searchTerm}
            onChange={props}
          />
          <label for="radioArtist">Artist</label>

          <input type="radio" id="radioGenre" name="filter" value="genre" />
          <label for="radioGenre">Genre</label>
        </div>
      ) : (
        <div style={{ minHeight: "50px" }} />
      )}
    </div>
  );
}
