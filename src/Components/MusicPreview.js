import React from "react";

export default class MusicPreview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // <p style={{ color: "red" }}>{this.props.music_preview_id}</p>

      <iframe
        title="musicPreview"
        src={
          "https://open.spotify.com/embed/track/" + this.props.music_preview_id
        }
        style={{
          border: "0",
          width: "100%",
          height: "85px",
        }}
        allowFullScreen
        allow="encrypted-media"
      ></iframe>
    );
  }
}
