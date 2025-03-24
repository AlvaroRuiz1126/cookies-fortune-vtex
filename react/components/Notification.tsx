import React from "react";
import { Alert } from "vtex.styleguide";

export const Notification = ({
  autoClose = 1000,
  text,
  type,
  onClose
}: {
  autoClose?: number;
  text: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}) => {
  return (
    <Alert
      autoClose={autoClose}
      type={type}
      onClose={onClose}
    >
      {text}
    </Alert>
  );
};
