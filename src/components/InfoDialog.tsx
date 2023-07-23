import { Dialog, DialogTitle, IconButton, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
export interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const InfoDialog = (props: InfoDialogProps): React.ReactNode => {
  const { onClose, open } = props;

  const handleClose = (): void => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ minWidth: 200 }}>
        <Typography variant="h6">About</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Typography sx={{ margin: 5 }}>This is Quick-split!</Typography>
    </Dialog>
  );
};
export default InfoDialog;
