import React from "react";
import "../Styles/SearchFilter.css";
import { useLocation } from "react-router-dom";

export default function SearchFilter(props) {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/compare" ? (
        <div className="radio-toolbar" onChange={props.filterTypeHandle}>
          <input
            type="radio"
            id="radioMusic"
            name="filter"
            value="music"
            checked={props.filterType == "music" ? true : false}
          />
          <label for="radioMusic"> Music </label>
          <input
            type="radio"
            id="radioArtist"
            name="filter"
            value="artist"
            checked={props.filterType == "artist" ? true : false}
          />
          <label for="radioArtist"> Artist </label>
          <input
            type="radio"
            id="radioGenre"
            name="filter"
            value="genre"
            checked={props.filterType == "genre" ? true : false}
          />
          <label for="radioGenre"> Genre </label>
        </div>
      ) : (
        <div
          style={{
            minHeight: "50px",
          }}
        />
      )}
    </div>
  );
}
