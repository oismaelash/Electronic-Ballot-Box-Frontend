import React, { Fragment, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../../api";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function VotePage() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [showCandidate, setShowCandidate] = useState(false);
  const [numberCandidate, setNumberCandidate] = useState(999);
  const [candidateSelected, setCandidateSelected] = useState({});

  const onSearchCandidate = () => {
    setLoading(true);
    axios
      .get(`Candidate/Legend/${numberCandidate}`)
      .then((response) => {
        setCandidateSelected(response.data);
        console.log(response.data);
        setShowCandidate(true);
      })
      .catch((error) => {
        alert("Erro on find candidate, try again:\n" + error);
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onVoteCandidate = (legendNumber) => {
    axios
      .post("Vote", {
        legend: legendNumber,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        alert("Erro on find candidate, try again: " + error);
      })
      .finally(() => {
        alert("Vote success");
        window.location.reload();
      });
  };

  const onClearSearch = () => {
    window.location.reload();
  };

  return (
    <Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Button
            onClick={() => {
              history.push("/");
              window.location.reload();
            }}
            variant="contained"
          >
            Back
          </Button>
          <Typography
            variant="h6"
            style={{ paddingLeft: "20px" }}
            color="inherit"
            noWrap
          >
            Vote Page
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Vote on your candidate
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="textSecondary"
              paragraph
            >
              Write the number of candidate and click on 'Search candidate'
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <TextField
                  type="number"
                  label="write the number"
                  onChange={(event) => setNumberCandidate(event.target.value)}
                />

                <Grid item>
                  <Button
                    onClick={onSearchCandidate}
                    variant="contained"
                    color="primary"
                  >
                    Search candidate
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => onVoteCandidate(0)}
                    variant="outlined"
                    color="primary"
                  >
                    Vote null
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {loading && (
          <Grid justify="center" container>
            <CircularProgress />
          </Grid>
        )}
        {showCandidate && (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid justify="center" container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={candidateSelected.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {candidateSelected.nameCandidate}
                    </Typography>
                    <Typography>
                      <span>Name:{candidateSelected.nameCandidate}</span>
                    </Typography>
                    <Typography>
                      <span>Vice: {candidateSelected.nameViceCandidate}</span>
                    </Typography>
                    <Typography>
                      <span>Number: {candidateSelected.legend}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={() => onVoteCandidate(candidateSelected.legend)}
                    variant="contained"
                    color="primary"
                  >
                    Confirm
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={onClearSearch}
                    variant="outlined"
                    color="primary"
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )}
      </main>
    </Fragment>
  );
}
