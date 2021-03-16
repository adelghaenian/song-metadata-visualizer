import React from "react";
import styled from "styled-components";
import searchIcon from "../assets/search-icon.png";

const Search = styled.input`
  color: #575d69;
  background: transparent;
  border: none;
  border-bottom: 2px solid #575d69;
  font-size: larger;
  margin-top: 8px;
  width: 90%;
  padding: 8px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-origin: content-box;
  background-size: contain;
  text-indent: 40px;
  :focus {
    outline: 0px; /* oranges! yey */
    color: white;
    border-bottom: 2px solid white;
  }
`;

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }
  render() {
    return (
      <form>
        <Search
          type="text"
          name="search"
          placeholder="Search"
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
export default SearchBox;
