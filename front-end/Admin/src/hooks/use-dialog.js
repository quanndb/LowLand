import { useContext, useEffect } from "react";
import { DialogContext } from "src/components/dialog/DialogProvider";

export function useDialog(state, callback) {
  const setDialogState = useContext(DialogContext);
  useEffect(() => {
    if (setDialogState) {
      setDialogState(callback);
      console.log(state);
    }
  }, [state, setDialogState]);
  return state;
}
