import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { ConfirmationModal } from "./ConfirmationWaning";

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

export const ContactModal = ({
  contactModalOpen,
  handleContactModalClose,
  selectedContact,
  setSelectedContact,
}) => {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState(false);
  const [contactObject, setContactObject] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setContactObject({
      name: data.get("name"),
      phone: data.get("phone"),
    });

    if (selectedContact) {
      setConfirmationModalOpen(true);
    }

    handleContactModalClose();
    setSelectedContact(null);
  };

  return (
    <>
      <ConfirmationModal
        confirmationModalOpen={confirmationModalOpen}
        setConfirmationModalOpen={setConfirmationModalOpen}
        contactObject={contactObject}
        action="update"
      />
      <Modal
        open={contactModalOpen}
        onClose={handleContactModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedContact ? "Editar contato" : "Novo contato"}
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="nome"
            name="name"
            autoComplete="name"
            autoFocus
            value={selectedContact?.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="telefone"
            id="phone"
            autoComplete="current-phone"
            value={selectedContact?.number}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Salvar
          </Button>
        </Box>
      </Modal>
    </>
  );
};
