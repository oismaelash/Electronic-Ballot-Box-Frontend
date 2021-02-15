import React, { Fragment, useState, useEffect, useContext } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "../../api";
import CardActions from "@material-ui/core/CardActions";
import CandidateForm from "../../Components/CandidateForm";
import { CandidateContext } from "../../Contexts/CandidateContext";
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

export default function Candidates() {
  const classes = useStyles();
  const { candidateDataContext, setCandidateDataContext } = useContext(
    CandidateContext
  );

  const [loading, setLoading] = useState(false);
  const [candidateSelected, setCandidateSelected] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [showCandidateForm, setShowCandidateForm] = useState(false);
  const [operationType, setOperationType] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("Candidate")
      .then((response) => {
        setCandidates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert(error);
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onAddCandidate = (candidateData) => {
    axios
      .post("Candidate", candidateData)
      .then((response) => {
        console.log(response.data);
        alert("New candidate add with success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onUpdateCandidate = (candidateData) => {
    console.log("data>", candidateData);
    axios
      .put(`Candidate/${candidateData.id}`, candidateData)
      .then((response) => {
        console.log(response.data);
        alert("Update with success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onDeleteCandidate = (candidateData) => {
    // console.log(candidateData);
    const confirmDelete = window.confirm("Confirm delete ?");
    if (!confirmDelete) return;
    candidateData.isEnable = false;
    axios
      .put(`Candidate/${candidateData.id}`, candidateData)
      .then((response) => {
        console.log(response.data);
        alert("Delete with success!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
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
            Candidates Page
          </Typography>
        </Toolbar>
      </AppBar>
      {showCandidateForm && (
        <CandidateForm
          onHandleClose={() => setShowCandidateForm(false)}
          candidateData={candidateSelected}
          onHandleConfirm={() => setShowCandidateForm(false)}
          onAddCandidate={onAddCandidate}
          onUpdateCandidate={onUpdateCandidate}
          operationType={operationType}
        />
      )}
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
              Manage the candidates
            </Typography>
            <Typography
              variant="h7"
              align="center"
              color="textSecondary"
              paragraph
            >
              Here you can add, update and delete the candidates
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={() => {
                      setOperationType("add");
                      setShowCandidateForm(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Add new candidate
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
        {true && (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid justify="center" container spacing={4}>
              {candidates.map((candidate) => (
                <Grid item key={candidate.Id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        candidate.image ??
                        "https://apprecs.org/gp/images/app-icons/300/8f/com.randomappsinc.studentpicker.jpg"
                      }
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {candidate.nameCandidate}
                      </Typography>
                      <Typography>
                        Vice: {candidate.nameViceCandidate}
                      </Typography>
                      <Typography variant="h10">
                        Creation: {candidate.dataCreation}
                      </Typography>
                      <Typography>Legend: {candidate.legend}</Typography>
                      <a href={candidate.image} target="_blank">
                        View image
                      </a>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => {
                          setOperationType("edit");
                          setCandidateDataContext(candidate);
                          setShowCandidateForm(true);
                        }}
                        variant="contained"
                        size="small"
                        color="default"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDeleteCandidate(candidate)}
                        variant="contained"
                        size="small"
                        color="secondary"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </Fragment>
  );
}
