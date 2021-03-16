import React from "react";

export default function MusicPreview(props) {
  return (
    <iframe
      title="musicPreview"
      src={"https://open.spotify.com/embed/track/" + props.music_preview_id}
      style={{
        border: "0",
        width: "100%",
        height: "235px",
      }}
      allowFullScreen
      allow="encrypted-media"
    ></iframe>
  );
}
