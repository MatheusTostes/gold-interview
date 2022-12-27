import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import api from "../helpers/api";

const style = {
  width: "90%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.2)",
  p: 4,
  borderRadius: 1,
};

export const ConfirmationModal = ({
  confirmationModalOpen,
  handleConfirmationModalClose,
  setConfirmationModalOpen,
  contactObject,
  action,
  contacts,
  setContacts,
  setNameError,
  setPhoneError,
  setSelectedContact,
  handleContactModalClose,
  setPhoneInUseError,
}) => {
  const handleSubmit = () => {
    setConfirmationModalOpen(false);

    if (action === "update") {
      (async () => {
        try {
          const {
            data: { data },
          } = await api.put(`/contacts/${contactObject.id}`, contactObject);

          const contactIndex = contacts.findIndex((obj) => obj.id === data.id);
          contacts[contactIndex] = data;

          setContacts([...contacts]);
          setSelectedContact(null);
          handleContactModalClose();
        } catch (error) {
          if (error.response.data.message.includes("name")) setNameError(true);
          if (error.response.data.message.includes("Invalid number"))
            setPhoneError(true);
          if (error.response.data.message.includes("Number already in use"))
            setPhoneInUseError(true);
        }
      })();
    } else if (action === "delete") {
      (async () => {
        try {
          const {
            data: { data },
          } = await api.delete(`/contacts/${contactObject.id}`);

          setContacts([...contacts.filter((c) => c.id !== data.id)]);
        } catch (error) {
          console.log(error.response.data.message);
        }
      })();
    }
  };

  const cancel = () => {
    setConfirmationModalOpen(false);
  };

  return (
    <Modal
      open={confirmationModalOpen}
      onClose={handleConfirmationModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {action === "update"
            ? "Atualizar este contato"
            : "Excluir este contato"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {action === "update" ? (
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              color="primary"
              onClick={handleSubmit}
            >
              {`Atualizar`}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
              style={{ backgroundColor: "#dc1471" }}
              onClick={handleSubmit}
            >
              {`Excluir`}
            </Button>
          )}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            style={{ color: "#dc1471", border: "1px solid #dc1471" }}
            onClick={cancel}
          >
            {`Cancelar`}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
