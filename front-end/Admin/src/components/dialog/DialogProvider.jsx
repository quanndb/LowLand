import { createContext, useState } from "react";
import LoadingDialog from "./LoadingDialog";

export const DialogContext = createContext();
export const DialogProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isLoading: false,
  });

  return (
    <DialogContext.Provider value={setDialogState}>
      <LoadingDialog isLoading={dialogState.isLoading} />
      {children}
    </DialogContext.Provider>
  );
};
