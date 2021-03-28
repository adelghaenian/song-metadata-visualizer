import MusicPreview from "./MusicPreview";
import SearchBox from "./SearchBox";
import SearchFilter from "./SearchFilter";
import ResultList from "./ResultList";
import styled from "styled-components";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
const Fixed = styled.div`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: #212330;
`;

export default function Sidebar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchTermHandler = (term) => {
    setSearchTerm(term);
  };
  const location = useLocation();
  return (
    <div>
      {location.pathname == "/overyears" ? (
        <></>
      ) : (
        <div className="fixed-sidebar">
          <Fixed>
            <MusicPreview
              music_preview_id={props.music_preview_id}
            ></MusicPreview>
            <SearchBox onInputChange={searchTermHandler}> </SearchBox>
            <SearchFilter
              filterTypeHandle={props.filterTypeHandle}
              filterType={props.filterType}
              filter={props.filter}
              handleFilter={props.handleFilter}
            ></SearchFilter>
          </Fixed>
          <ResultList
            addMusic={props.addMusic}
            onAddHandle={props.onAddHandle}
            filterTypeHandle={props.filterTypeHandle}
            filterType={props.filterType}
            onPreviewChange={props.onPreviewChange}
            music_data={props.music_data}
            searchTerm={searchTerm}
            selected={props.selected}
            onSelectedChange={props.onSelectedChange}
            device_height={props.device_height}
          ></ResultList>
        </div>
      )}
    </div>
  );
}
