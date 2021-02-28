import React from "react";
import MusicPreview from "./MusicPreview";
import SearchBox from "./SearchBox";
import SearchFilter from "./SearchFilter";

export default function Sidebar() {
  return (
    <div style={{ backgroundColor: "#212330" }}>
      <MusicPreview music_preview_src="https://open.spotify.com/embed/track/4ktmfZJXIi6VGktaD34NAl"></MusicPreview>
      <SearchBox></SearchBox>
      <SearchFilter></SearchFilter>
    </div>
  );
}
