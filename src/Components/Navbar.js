import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  .navbar-nav {
    padding-right: 20px;
    margin-top: 10px;
    a {
      color: #969696;
      font-weight: bold;
      font-size: 1.4em;
      margin-right: 40px;
    }
    a: hover {
      text-decoration-line: unset;
    }
    .active {
      color: white;
      text-decoration-line: underline;
      text-decoration-thickness: 5px;
      text-underline-offset: 14px;
    }
  }
`;

function App(props) {
  const selectionClickHandle = (e) => {
    if (props.filterType != "music") {
      props.setFilterType("music");
      props.setSelected(new Set());
    }
  };
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink to="/compare">COMPARE</NavLink>
            <NavLink to="/selection" onClick={selectionClickHandle}>
              SELECTION
            </NavLink>
            <NavLink to="/overyears">OVER YEARS</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}
export default App;
