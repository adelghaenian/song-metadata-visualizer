import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  HashRouter,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "./Components/Navbar";
import Compare from "./Components/Compare";
import Selection from "./Components/Selection";
import Overyears from "./Components/Overyears";
import NoMatch from "./Components/NoMatch";
import Sidebar from "./Components/Sidebar";
import { Layout } from "./Components/Layout";
import data_with_pca from "./dataset/data_with_pca.csv";
import artist_data from "./dataset/data_by_artist.csv";
import genre_data from "./dataset/data_by_genres.csv";
import year_data from "./dataset/data_by_year.csv";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { csv } from "d3";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#75ada0",
    },
    secondary: {
      main: "#31b475",
    },
  },
});

function App() {
  const [selected, setSelected] = useState(new Set());
  const [music_data, setMusicData] = useState(new Array());
  const [artist_data, setArtistData] = useState(new Array());
  const [genre_data, setGenreData] = useState(new Array());
  const [year_data, setYearData] = useState(new Array());
  const [chartTypeValue, setChartTypeValue] = React.useState("radar");
  const [music_preview_id, setMusicPreviewId] = useState(
    "1YYhDizHx7PnDhAhko6cDS"
  );
  const [range_min_value, setRangeMinValue] = useState(7000);
  const [range_max_value, setRangeMaxValue] = useState(10000);
  const [loadedDS, setLoadedDS] = useState(0);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadedDS = (i) => {
    setLoadedDS(i);
  };

  const onPreviewChange = useCallback(
    (id) => {
      setMusicPreviewId(id);
    },
    [music_preview_id]
  );

  const onRangeChange = useCallback(
    (newValue) => {
      setRangeMinValue(newValue[0]);
      setRangeMaxValue(newValue[1]);
    },
    [range_min_value, range_max_value]
  );

  const onSelectedChange = useCallback(
    (s) => {
      if (selected.has(s)) {
        const newSet = new Set(selected);
        newSet.delete(s);
        setSelected(newSet);
        console.log("found");
      } else {
        const newSet = new Set(selected);
        newSet.add(s);
        setSelected(newSet);
      }
    },
    [selected]
  );

  const size = useWindowSize();

  useEffect(() => {
    csv(genre_data).then((data) => {
      setGenreData(data);
      handleLoadedDS(1);
      csv(artist_data).then((data) => {
        setArtistData(data);
        handleLoadedDS(2);
        csv(year_data).then((data) => {
          setYearData(data);
          handleLoadedDS(3);
          csv(data_with_pca).then((data) => {
            setMusicData(data);
            handleClose();
          });
        });
      });
    });
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <HashRouter>
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
            {music_data.length > 0 && (
              <Sidebar
                onPreviewChange={onPreviewChange}
                music_preview_id={music_preview_id}
                music_data={music_data}
                onSelectedChange={onSelectedChange}
                selected={selected}
                device_height={size.height}
              ></Sidebar>
            )}
            <Col>
              <Navbar />
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/compare" />
                  </Route>
                  <Route
                    path="/selection"
                    component={() => (
                      <Selection
                        music_data={music_data}
                        onSelectedChange={onSelectedChange}
                        onPreviewChange={onPreviewChange}
                        onRangeChange={onRangeChange}
                        selected={selected}
                        device_height={size.height}
                        device_width={size.width}
                        range_max_value={range_max_value}
                        range_min_value={range_min_value}
                      />
                    )}
                  ></Route>
                  <Route
                    path="/compare"
                    component={() => (
                      <Compare
                        chartTypeValue={chartTypeValue}
                        setChartTypeValue={setChartTypeValue}
                        music_data={music_data}
                        onSelectedChange={onSelectedChange}
                        selected={selected}
                        device_height={size.height}
                        device_width={size.width}
                      />
                    )}
                  ></Route>
                  <Route path="/overyears" component={Overyears}></Route>
                  <Route component={NoMatch}></Route>
                </Switch>
              </Layout>
            </Col>
          </Row>
          <Dialog
            open={open}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Dataset(" + (loadedDS + 1) + "/4) is loading!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Datasets are too large and have been stored in the git lfs.
                Thus, the loading might be slow. Thanks for your patience!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>
      </HashRouter>
    </MuiThemeProvider>
  );
}

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
export default App;
