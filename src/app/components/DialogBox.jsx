import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Transition } from "../helper/requirement";
export default function AlertDialogSlide({
  stateOpen,
  onClose,
  msgTitle,
  msgBody,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={stateOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{msgTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {msgBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
