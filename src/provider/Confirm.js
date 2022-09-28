import React, {
  useState,
  useCallback,
  Fragment,
  useContext,
} from "react";
import ConfirmModal from "../components/ConfirmModal";
import ConfirmContext from "./ConfirmContext";

const DEFAULT_OPTIONS = {
  title: "Are you sure?",
  description: "",
  confirmationText: "Ok",
  cancellationText: "Cancel",
};

const buildOptions = (defaultOptions, options) => {
  const titleProps = {
    ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
    ...(options.titleProps || {}),
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    titleProps,
  };
};

export const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

export const ConfirmProvider = ({ children, defaultOptions = {} }) => {
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);
  const [resolve, reject] = resolveReject;

  const confirm = useCallback((options = {}) => {
    return new Promise((resolve, reject) => {
      setOptions(options);
      setResolveReject([resolve, reject]);
    });
  }, []);
  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  return (
    <Fragment>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmModal
        open={resolveReject.length === 2}
        options={buildOptions(defaultOptions, options)}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};
