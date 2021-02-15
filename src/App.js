import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import VotePage from "./Pages/Vote";
import VoteRanking from "./Pages/VoteRanking";
import Candidates from "./Pages/Candidates";
import Main from "./Pages/Main";
import { CandidateContext } from "./Contexts/CandidateContext";

function App() {

  const [candidateDataContext, setCandidateDataContext] = useState({});

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/vote">
          <VotePage />
        </Route>
        <Route exact path="/vote-ranking">
          <VoteRanking />
        </Route>
        <CandidateContext.Provider value={{candidateDataContext, setCandidateDataContext}}>
          <Route exact path="/candidates">
            <Candidates />
          </Route>
        </CandidateContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
