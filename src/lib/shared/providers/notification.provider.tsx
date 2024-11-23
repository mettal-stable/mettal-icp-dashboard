import { closeSnackbar, enqueueSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

export interface INotificationInput {
  message: string | React.ReactNode;
  value?: any;
}
export interface INotificationContext {
  useConfirm(input: IConfirmWindow): void;
  useErrorAlert(input: INotificationInput): void;
  useSuccessAlert(input: INotificationInput): void;
  useInfoAlert(input: INotificationInput): void;
  confirmValue: any;
}
export interface INotificationProvider {
  children: React.ReactNode;
}

const action = (snackbarId: any) => (
  <>
    <IconButton
      sx={{ color: "#fff" }}
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      <CloseIcon />
    </IconButton>
  </>
);

interface IConfirmWindow extends INotificationInput {
  open: boolean;
  value: any;
  onClose(): void;
  onOk(value: any): void;
}
export const ConfirmWindow: React.FC<IConfirmWindow> = (props) => {
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onOk(props.value);
            }}
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export const NotificationContext = React.createContext<
  Partial<INotificationContext>
>({});
export const NotificationProvider: React.FC<INotificationProvider> = (
  props
) => {
  const [confirmInput, setConfirmInput] = useState<IConfirmWindow>();

  const onCloseConfirm = () => {
    if (confirmInput) {
      confirmInput.open = false;
      setConfirmInput({ ...confirmInput });
    }
  };
  const useConfirm = (input: IConfirmWindow) => {
    setConfirmInput(input);
  };
  const useErrorAlert = (input: INotificationInput) => {
    enqueueSnackbar(input.message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      action,
      variant: "error",
      preventDuplicate: true,
    });
  };

  const useSuccessAlert = (input: INotificationInput) => {
    enqueueSnackbar(input.message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      action,
      variant: "success",
      preventDuplicate: true,
    });
  };

  const useInfoAlert = (input: INotificationInput) => {
    enqueueSnackbar(input.message, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      action,
      variant: "info",
      preventDuplicate: true,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ useErrorAlert, useSuccessAlert, useConfirm, useInfoAlert }}
    >
      <ConfirmWindow
        open={confirmInput?.open || false}
        value={confirmInput?.value}
        onClose={(): void => {
          onCloseConfirm();
          confirmInput?.onClose();
        }}
        onOk={(value: any): void => {
          confirmInput?.onOk(value);
          onCloseConfirm();
        }}
        message={confirmInput?.message || ""}
      />
      {props.children}
    </NotificationContext.Provider>
  );
};
