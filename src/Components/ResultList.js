import React from "react";
import { FixedSizeList as List } from "react-window";
import playButton from "../assets/play-button.svg";

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
  }
  handleSelectedChange(s) {
    this.props.onSelectedChange(s);
  }
  render() {
    const searchTerm = this.props.searchTerm;
    var results = this.props.music_data;

    if (this.props.filterType == "music") {
      results = this.props.music_data.filter((li) =>
        li.name.toLowerCase().includes(searchTerm)
      );
    } else if (this.props.filterType == "artist") {
      results = this.props.music_data.filter((li) =>
        li.artists.toLowerCase().includes(searchTerm)
      );
    } else if (this.props.filterType == "genre") {
      results = this.props.music_data.filter((li) =>
        li.genres.toLowerCase().includes(searchTerm)
      );
    }

    results = results.filter((el) => !this.props.selected.has(el));
    results = Array.from(this.props.selected).concat(results);

    const Row = ({ index, style }) => (
      <div className="test" style={style}>
        <div
          style={{
            display: "-webkit-inline-box",
          }}
          onClick={() => this.handleSelectedChange(results[index])}
          className={
            this.props.selected.has(results[index])
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
            {this.props.filterType == "music" ? (
              <img
                className="play-button"
                height="25"
                src={playButton}
                alt="P"
                onClick={(e) => {
                  e.stopPropagation();
                  this.props.onPreviewChange(results[index].id);
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
      <>
        <List
          width={340}
          height={this.props.device_height - 343}
          itemCount={results.length}
          itemSize={55}
        >
          {Row}
        </List>
      </>
    );
  }
}
