import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import General from "./Components/General";
import Prediction from "./Components/Prediction";
import NoMatch from "./Components/NoMatch";
import Sidebar from "./Components/Sidebar";
import BubbleChart from "./Components/BubbleChart";
import { Layout } from "./Components/Layout";
import clustering_and_genre from "./dataset/clustering_and_genre.csv";
import artist_data_csv from "./dataset/data_by_artist.csv";
import genre_data_csv from "./dataset/data_by_genres.csv";
import year_data from "./dataset/data_by_year.csv";
import line_for_songs_genre_count_location from "./dataset/line_for_songs_genre_count.csv";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



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
    type: "dark",
  },
});

export default function App() {
  const [selected, setSelected] = useState(new Set());
  const [classified_data, setClassifiedData] = useState(new Array());
  const [music_data, setMusicData] = useState(new Array());
  const [artist_data, setArtistData] = useState(new Array());
  const [genre_data, setGenreData] = useState(new Array());
  const [selectedSongToRecommend, setSelectedSongToRecommend] = useState();
  const [line_for_songs_genre_count, set_line_for_songs_genre_count] = useState(new Array())
  const [overyears_data, setOverYearsData] = useState(new Array());
  const [filterType, setFilterType] = useState("music");
  const [chartTypeValue, setChartTypeValue] = React.useState("radar");
  const [convexHullsChecked, setConvexHullsChecked] = React.useState(false);
  const [rDimensionMethod, setRDimensionMethod] = React.useState("pca");
  const [classificationMethod, setClassificationMethod] = React.useState("kmeans");
  const [hierarchicalMethod, setHierarchicalMethod] = React.useState("ward");
  const [recommendationCount, setRecommendationCount] = React.useState(5);
  const [recommendUIIsShow, setRecommendUIIsShow] = React.useState(false)
  const [selectedAttributes, setSelectedAttributes] = React.useState([
    "acousticness",
    "energy",
  ]);
  const [music_preview_id, setMusicPreviewId] = useState(
    "1YYhDizHx7PnDhAhko6cDS"
  );
  const [range_min_value, setRangeMinValue] = useState(7000);
  const [range_max_value, setRangeMaxValue] = useState(10000);

  const [loadedDS, setLoadedDS] = useState(0);
  const [open, setOpen] = React.useState(true);

  const handleAttributesChange = function (d) {
    if (selectedAttributes.includes(d.target.id)) {
      const filteredItems = selectedAttributes.filter((s) => s !== d.target.id);
      setSelectedAttributes([...filteredItems]);
    } else {
      const newItems = [...selectedAttributes];
      newItems.push(d.target.id);
      setSelectedAttributes(newItems);
    }
  };

  const filterTypeHandle = (e) => {
    setSelected(new Set());
    setFilterType(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addMusic = (data) => {
    setMusicData([data, ...music_data]);
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
    csv(genre_data_csv).then((data) => {
      setGenreData(data);
      handleLoadedDS(1);
      csv(artist_data_csv).then((data) => {
        setArtistData(data);
        handleLoadedDS(2);
        csv(year_data).then((data) => {
          setOverYearsData(data);
          handleLoadedDS(3);
          csv(clustering_and_genre).then((data) => {
            setMusicData(data);
            setClassifiedData(data);
            handleLoadedDS(4);
            csv(line_for_songs_genre_count_location).then((data) => {
              set_line_for_songs_genre_count(data)
              handleClose();
            });
          });
        });
      });
    });
  }, []);

  function openRecommendUI(id) {
    setSelectedSongToRecommend(id)
    setRecommendUIIsShow(true)
  }
  return (
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <Container
          fluid="true"
          style={{
            paddingRight: "15px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >

          <Row>
            {(music_data.length > 0) &&
              < Sidebar
                openRecommendUI={openRecommendUI}
                classified_data={classified_data}
                addMusic={addMusic}
                filterTypeHandle={filterTypeHandle}
                filterType={filterType}
                onPreviewChange={onPreviewChange}
                music_preview_id={music_preview_id}
                music_data={
                  filterType == "music"
                    ? music_data
                    : filterType == "artist"
                      ? artist_data
                      : genre_data
                }
                onSelectedChange={onSelectedChange}
                selected={selected}
                device_height={size.height}
              ></Sidebar>
            }
            <Col>
              <Navbar
                filterType={filterType}
                setFilterType={setFilterType}
                setSelected={setSelected}
              />

              <div>

              </div>
              <Layout>
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/compare" />
                  </Route>
                  <Route
                    path="/selection"
                    component={() => (
                      <Prediction
                        device_height={size.height}
                        device_width={size.width}
                      ></Prediction>
                    )}
                  ></Route>
                  <Route
                    path="/general"
                    component={() => (
                      <div>

                        <General
                          line_for_songs_genre_count={line_for_songs_genre_count}
                          selectedAttributes={selectedAttributes}
                          handleAttributesChange={handleAttributesChange}
                          device_height={size.height}
                          device_width={size.width}
                          music_data={music_data}
                        ></General>

                      </div>
                    )}
                  >

                  </Route>
                  <Route
                    path="/compare"
                    component={() => (
                      <div>
                        <div style={{
                          height: "100%",
                          width: "100%",
                          display: "flex"
                        }}>
                          <Selection
                            classified_data={classified_data}
                            music_data={music_data}
                            onSelectedChange={onSelectedChange}
                            onPreviewChange={onPreviewChange}
                            onRangeChange={onRangeChange}
                            selected={selected}
                            device_height={size.height}
                            device_width={size.width}
                            range_max_value={range_max_value}
                            range_min_value={range_min_value}
                            convexHullsChecked={convexHullsChecked}
                            rDimensionMethod={rDimensionMethod}
                            classificationMethod={classificationMethod}
                            hierarchicalMethod={hierarchicalMethod}
                          />
                          <div style={{ paddingTop: "50px", width: "300px" }}>
                            <FormGroup>
                              <FormControlLabel style={{ fontSize: "20px", color: "white" }} control={<Checkbox checked={convexHullsChecked} onChange={(event) => {
                                setConvexHullsChecked(event.target.checked)
                              }} defaultChecked />} label="convex hulls" />
                              <InputLabel style={{ marginTop: "20px" }} id="demo-simple-select-label">Dimension Reduction Method</InputLabel>
                              <Select
                                value={rDimensionMethod}
                                label="Reduce dimension method"
                                onChange={(event) => {
                                  setRDimensionMethod(event.target.value);
                                }}
                              >
                                <MenuItem value={"tsne"}>TSNE</MenuItem>
                                <MenuItem value={"pca"}>PCA</MenuItem>
                              </Select>

                              <InputLabel style={{ marginTop: "40px" }} id="demo-simple-select-label">Clustering method</InputLabel>
                              <Select
                                value={classificationMethod}
                                label="Classification method"
                                onChange={(event) => {
                                  setClassificationMethod(event.target.value);
                                }}
                              >
                                <MenuItem value={"kmeans"}>K-Means</MenuItem>
                                <MenuItem value={"optics"}>Optics</MenuItem>
                                <MenuItem value={"hierarchical"}>Hierarchical</MenuItem>
                              </Select>
                              {classificationMethod === "hierarchical" &&
                                <div>
                                  <InputLabel style={{ marginTop: "10px" }} id="demo-simple-select-label">Linkage Method</InputLabel>
                                  <Select
                                    value={hierarchicalMethod}
                                    label="Hierarchical method"
                                    onChange={(event) => {
                                      setHierarchicalMethod(event.target.value);
                                    }}
                                  >
                                    <MenuItem value={"ward"}>Ward</MenuItem>
                                    <MenuItem value={"complete"}>Complete</MenuItem>
                                    <MenuItem value={"average"}>Average</MenuItem>
                                    <MenuItem value={"single"}>Single</MenuItem>
                                  </Select>
                                </div>
                              }
                            </FormGroup>
                          </div>
                        </div>
                        <Compare
                          chartTypeValue={chartTypeValue}
                          setChartTypeValue={setChartTypeValue}
                          music_data={
                            filterType == "music"
                              ? music_data
                              : filterType == "artist"
                                ? artist_data
                                : genre_data
                          }
                          onSelectedChange={onSelectedChange}
                          selected={selected}
                          device_height={size.height}
                          device_width={size.width}
                        />
                      </div>
                    )}
                  ></Route>

                  <Route component={NoMatch}></Route>
                </Switch>
              </Layout>
            </Col>
          </Row>

          <Dialog open={recommendUIIsShow} onClose={() => setRecommendUIIsShow(false)}>
            <DialogTitle>Recommend Simillar Songs</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please select how many songs do you want to see as the recommendation
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Recommendations Count"
                type="number"
                fullWidth
                value={recommendationCount}
                variant="standard"
                onChange={(e) => setRecommendationCount(Number(e.target.value))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRecommendUIIsShow(false)}>Cancel</Button>
              <Button onClick={() => {
                fetch('https://spotifysongapi.herokuapp.com/recommend?id=' + selectedSongToRecommend + "&count=" + recommendationCount)
                  .then(response => response.json())
                  .then(data => {
                    console.log(Object.values(data.id));
                    var musicsToSelect = music_data.filter(s => Object.values(data.id).includes(s.id))
                    var selected_temp = new Set(selected)
                    musicsToSelect.forEach(s => {
                      selected_temp.add(s)
                    });
                    setSelected(selected_temp)
                  });
                setRecommendUIIsShow(false)
              }}>Recommend</Button>
            </DialogActions>
          </Dialog>


          <Dialog
            open={open}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Dataset(" + (loadedDS + 1) + "/5) is loading!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Datasets are too large and have been stored in the git lfs.
                Thus, the loading might be slow. Thanks for your patience!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Container>
      </HashRouter >
    </MuiThemeProvider >
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
