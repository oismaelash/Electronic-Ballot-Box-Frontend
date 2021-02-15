import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Electronic Ballot Box
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              <Typography>Electronic Ballot Box System </Typography>
              <Typography>
                by{" "}
                <a href="https://github.com/ismaelash" target="_blank">
                  @ismaelash
                </a>
              </Typography>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <a
                      style={{ color: "white" }}
                      href="https://github.com/ismaelash/Electronic-Ballot-Box-Frontend"
                      target="_blank"
                    >
                      Github
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://d2v9ipibika81v.cloudfront.net/uploads/sites/72/431539-PE9O1K-661-1140x684.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Vote
                  </Typography>
                  <Typography>Search the candidate and vote now</Typography>
                </CardContent>
                <CardActions
                  justify="center"
                  style={{ justifyContent: "center" }}
                >
                  <Button
                    style={{ width: "100%" }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      history.push("/vote");
                      window.location.reload();
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://searchengineland.com/figz/wp-content/seloads/2017/03/seo-search-rankings-analytics-ss-1920-800x549.gif"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Vote Ranking
                  </Typography>
                  <Typography>See the ranking the candidates votes</Typography>
                </CardContent>
                <CardActions
                  justify="center"
                  style={{ justifyContent: "center" }}
                >
                  <Button
                    style={{ width: "100%" }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      history.push("/vote-ranking");
                      window.location.reload();
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://st.depositphotos.com/1010613/3504/v/950/depositphotos_35047717-stock-illustration-people-figures-holding-hands.jpg"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Manage Candidates
                  </Typography>
                  <Typography>Add, update or delete the candidates</Typography>
                </CardContent>
                <CardActions
                  justify="center"
                  style={{ justifyContent: "center" }}
                >
                  <Button
                    style={{ width: "100%" }}
                    size="small"
                    color="primary"
                    onClick={() => {
                      history.push("/candidates");
                      window.location.reload();
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}
