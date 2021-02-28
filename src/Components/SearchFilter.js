import React from "react";
import "../Styles/SearchFilter.css";

export default function SearchFilter() {
  return (
    <div class="radio-toolbar">
      <input
        type="radio"
        id="radioMusic"
        name="filter"
        value="music"
        defaultChecked
      />
      <label for="radioMusic">Music</label>

      <input type="radio" id="radioArtist" name="filter" value="artist" />
      <label for="radioArtist">Artist</label>

      <input type="radio" id="radioGenre" name="filter" value="genre" />
      <label for="radioGenre">Genre</label>
      <p>d</p>
      <p>d</p>
    </div>
  );
}
