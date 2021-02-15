import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CandidateContext } from "../../Contexts/CandidateContext";

export default function CandidateForm({
  onHandleClose,
  onHandleConfirm,
  operationType,
  onAddCandidate,
  onUpdateCandidate,
}) {
  const { candidateDataContext, setCandidateDataContext } = useContext(
    CandidateContext
  );
  const [idCandidate, setIdCandidate] = useState(0);
  const [nameCandidate, setNameCandidate] = useState("");
  const [nameViceCandidate, setNameViceCandidate] = useState("");
  const [legendCandidate, setLegendCandidate] = useState(0);
  const [imageCandidate, setImageCandidate] = useState("");
  const [isEnable, setIsEnable] = useState(true);
  const [dateCreation, setDateCreation] = useState(new Date());

  useEffect(() => {
    console.log(candidateDataContext);
    setIdCandidate(candidateDataContext.id ?? 0);
    setNameCandidate(candidateDataContext.nameCandidate ?? "");
    setNameViceCandidate(candidateDataContext.nameViceCandidate ?? "");
    setLegendCandidate(candidateDataContext.legend ?? 0);
    setImageCandidate(candidateDataContext.image ?? "");
    setIsEnable(candidateDataContext.isEnable ?? true);
    setDateCreation(candidateDataContext.dataCreation ?? new Date());
  }, []);

  const onConfirmClicked = () => {
    const candidateCurrent = {
      id: idCandidate,
      nameCandidate: nameCandidate,
      nameViceCandidate: nameViceCandidate,
      legend: parseInt(legendCandidate),
      image: imageCandidate,
      isEnable: isEnable,
      dataCreation: dateCreation
    };

    switch (operationType) {
      case "add":
        onAddCandidate(candidateCurrent);
        break;
      case "edit":
        onUpdateCandidate(candidateCurrent);
        break;
    }

    onHandleConfirm();
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={onHandleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Candidate</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name candidate"
            fullWidth
            value={nameCandidate}
            onChange={(event) => setNameCandidate(event.target.value)}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Name vice"
            fullWidth
            value={nameViceCandidate}
            onChange={(event) => setNameViceCandidate(event.target.value)}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Legend"
            type="number"
            fullWidth
            value={legendCandidate}
            onChange={(event) => setLegendCandidate(event.target.value)}
          />
          <TextField
            // autoFocus
            margin="dense"
            id="name"
            label="Image url"
            fullWidth
            value={imageCandidate}
            onChange={(event) => setImageCandidate(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onHandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onConfirmClicked} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
