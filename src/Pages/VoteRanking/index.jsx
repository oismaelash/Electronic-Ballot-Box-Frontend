import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Fragment } from "react";
import { Button } from "@material-ui/core";
import axios from "../../api";
import history from "../../history";

export default function VoteRanking() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios
      .get("Vote")
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        alert("Erro on find candidate, try again:\n " + error);
        window.location.reload();
      });
  }, [candidates]);

  return (
    <Fragment>
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
            style={{ paddingLeft: "20px" }}
            variant="h6"
            color="inherit"
            noWrap
          >
            Vote Ranking
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">NAME CANDIDATE</TableCell>
              <TableCell align="center">NAME VICE CANDIDATE</TableCell>
              <TableCell align="center">LEGEND</TableCell>
              <TableCell align="center">COUNT VOTES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow
                style={{
                  backgroundColor:
                    candidate.legend == 0 ? "yellowgreen" : "white",
                }}
                key={candidate.candidateId}
              >
                <TableCell align="center">{candidate.candidateId}</TableCell>
                <TableCell align="center">{candidate.nameCandidate}</TableCell>
                <TableCell align="center">{candidate.nameViceCandidate}</TableCell>
                <TableCell align="center">{candidate.legend}</TableCell>
                <TableCell align="center">{candidate.countVote}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
