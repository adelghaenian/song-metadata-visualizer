import React from "react";
import "../Styles/SearchFilter.css";

import Slider from "@material-ui/core/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function SearchFilter() {
  return (
    <div>
      {/* <div className="radio-toolbar">
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
        value={searchTerm}
        onChange={handleChange}
      />
      <label for="radioArtist">Artist</label>

      <input type="radio" id="radioGenre" name="filter" value="genre" />
      <label for="radioGenre">Genre</label>
    </div> */}
    </div>
  );
}
