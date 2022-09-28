import { Modal } from "antd";
import React from "react";

const ConfirmModal = ({ open, options, onCancel, onConfirm }) => {
  const { title, description, confirmationText, cancellationText } = options;

  return (
    <Modal
      title={title}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={confirmationText}
      cancelText={cancellationText}
    >
      <p>{description}</p>
    </Modal>
  );
};

export default ConfirmModal;
