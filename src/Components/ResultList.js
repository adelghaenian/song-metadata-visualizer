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
    const results = this.props.music_data.filter((li) =>
      li.name.toLowerCase().includes(searchTerm)
    );

    const Row = ({ index, style }) => (
      <div className="test" style={style}>
        <div
          style={{ display: "-webkit-inline-box" }}
          onClick={() => this.handleSelectedChange(results[index])}
          className={
            this.props.selected.has(results[index])
              ? "song-selected"
              : "song-notselected"
          }
        >
          <p style={{ width: "3em", textAlign: "left" }}>
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
          </p>
          <div class="text ellipsis">
            <span class="text-concat song-text">
              {index + 1 + "- " + results[index].name}
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
