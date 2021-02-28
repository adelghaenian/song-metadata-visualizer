import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Components/Navbar";
import Compare from "./Components/Compare";
import Selection from "./Components/Selection";
import Overyears from "./Components/Overyears";
import NoMatch from "./Components/NoMatch";
import Sidebar from "./Components/Sidebar";
import { Layout } from "./Components/Layout";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <Container fluid="true">
        <Row>
          <Col xs={3} className="center-horizontal">
            <Sidebar></Sidebar>
          </Col>
          <Col xs={9}>
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

export default App;
