import React from "react";
import MusicPreview from "./MusicPreview";
import SearchBox from "./SearchBox";
import SearchFilter from "./SearchFilter";
import ResultList from "./ResultList";
import styled from "styled-components";

const Fixed = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: #212330;
`;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.searchTermHandler = this.searchTermHandler.bind(this);
  }
  searchTermHandler(term) {
    this.setState({
      searchTerm: term,
    });
  }
  render() {
    const searchTerm = this.state.searchTerm;
    const selected = this.state.selected;
    return (
      <div className="fixed-sidebar">
        <Fixed>
          <MusicPreview
            music_preview_id={this.props.music_preview_id}
          ></MusicPreview>
          <SearchBox onInputChange={this.searchTermHandler}> </SearchBox>
          <SearchFilter> </SearchFilter>
        </Fixed>
        <ResultList
          onPreviewChange={this.props.onPreviewChange}
          music_data={this.props.music_data}
          searchTerm={searchTerm}
          selected={this.props.selected}
          onSelectedChange={this.props.onSelectedChange}
        ></ResultList>
      </div>
    );
  }
}
