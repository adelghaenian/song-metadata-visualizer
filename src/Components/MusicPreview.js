import React from "react";

export default function MusicPreview(props) {
  return ( <
    iframe title = "musicPreview"
    src = {
      props.music_preview_src
    }
    style = {
      {
        border: "0",
        width: "100%",
        height: "235px"
      }
    }
    allowFullScreen allow = "encrypted-media" >
    < /iframe>
  );
}