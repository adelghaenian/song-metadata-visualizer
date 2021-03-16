import React from "react";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";

const ListItem = styled.div`
  display: -webkit-inline-box;
  margin-bottom: -6px;
`;

export default class ResultList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    console.log(this.props.music_data);
  }
  handleSelectedChange(id) {
    this.props.onSelectedChange(id);
    this.forceUpdate();
  }
  render() {
    const searchTerm = this.props.searchTerm;
    const results = this.props.music_data.filter((li) =>
      li.name.toLowerCase().includes(searchTerm)
    );

    const Row = ({ index, key, style }) => (
      <div className="test" style={style}>
        <div
          style={{ boxSizing: "border-box", display: "-webkit-inline-box" }}
          key={results[index].id}
          onClick={() => this.handleSelectedChange(results[index].id)}
          className={
            this.props.selected.has(results[index].id)
              ? "song-selected"
              : "song-notselected"
          }
        >
          <p style={{ width: "3em", textAlign: "left" }}>{index + 1}</p>
          <div class="text ellipsis">
            <span class="text-concat song-text">{results[index].name}</span>
          </div>
        </div>
      </div>
    );
    return (
      <List width={340} height={600} itemCount={results.length} itemSize={63}>
        {Row}
      </List>
    );
  }
}
