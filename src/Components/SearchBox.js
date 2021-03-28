import React from "react";
import Button from "@material-ui/core/Button";
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
      // style={{ display: "-webkit-inline-flex" }}
      <form>
        <Search
          type="text"
          name="search"
          placeholder="Search"
          onChange={this.handleChange}
        />
        {/* <Button
          variant="contained"
          color="secondary"
          style={{
            height: "48px",
            width: "48px",
            minWidth: "0px",
            fontSize: "1.5em",
            color: "white",
            fontWeight: "lighter",
            marginTop: "5px",
            marginLeft: "15px",
            borderRadius: "15px",
          }}
        >
          +
        </Button> */}
      </form>
    );
  }
}
export default SearchBox;
