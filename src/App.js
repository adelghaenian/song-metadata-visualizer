import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Components/Navbar";
import Compare from "./Components/Compare";
import Selection from "./Components/Selection";
import Overyears from "./Components/Overyears";
import NoMatch from "./Components/NoMatch";
import Sidebar from "./Components/Sidebar";
import { Layout } from "./Components/Layout";
import data_with_csv from "./dataset/data_with_pca.csv";
import { csv } from "d3";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: new Set(),
      music_data: new Array(),
    };
    this.onSelectedChange = this.onSelectedChange.bind(this);
  }

  onSelectedChange(id) {
    if (this.state.selected.has(id)) {
      this.state.selected.delete(id);
    } else {
      this.state.selected.add(id);
    }
  }

  componentDidMount() {
    csv(data_with_csv).then((data) => {
      this.setState({ music_data: data });
    });
  }

  render() {
    return (
      <Router>
        <Container
          fluid="true"
          style={{
            paddingRight: "15px",
            paddingLeft: "20em",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Row>
            {console.log(this.state.music_data.length)}
            {this.state.music_data.length > 0 && (
              <Sidebar
                music_data={this.state.music_data}
                onSelectedChange={this.onSelectedChange}
                selected={this.state.selected}
              ></Sidebar>
            )}
            <Col>
              <Navbar />
              <Layout>
                <Switch>
                  <Route path="/selection" component={Selection}></Route>
                  <Route path="/compare" component={Compare}></Route>
                  <Route path="/overyears" component={Overyears}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Layout>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}
