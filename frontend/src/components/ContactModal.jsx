import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { ConfirmationModal } from "./ConfirmationModal";
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

export const ContactModal = ({
  contactModalOpen,
  handleContactModalClose,
  selectedContact,
  setSelectedContact,
  contacts,
  setContacts,
}) => {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState(false);
  const [contactObject, setContactObject] = React.useState({});
  const [nameError, setNameError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataContact = {
      id: selectedContact?.id,
      name: data.get("name"),
      number: data.get("phone"),
    };

    setContactObject(dataContact);

    if (selectedContact) {
      setConfirmationModalOpen(true);
    }

    if (!selectedContact) {
      (async () => {
        try {
          const {
            data: { data },
          } = await api.post("/contacts", dataContact);
          setContacts([...contacts, data]);
          handleContactModalClose();
        } catch (error) {
          if (error.response.data.message.includes("name")) setNameError(true);
          if (
            error.response.data.message.includes("Number") ||
            error.response.data.message.includes("number")
          )
            setPhoneError(true);
          console.log(error.response.data.message);
        }
      })();
    }
  };

  return (
    <>
      <ConfirmationModal
        confirmationModalOpen={confirmationModalOpen}
        setConfirmationModalOpen={setConfirmationModalOpen}
        contactObject={contactObject}
        action="update"
        contacts={contacts}
        setContacts={setContacts}
        setNameError={setNameError}
        setPhoneError={setPhoneError}
        setSelectedContact={setSelectedContact}
        handleContactModalClose={handleContactModalClose}
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
            defaultValue={selectedContact?.name}
            onChange={() => setNameError(false)}
          />

          {nameError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Nome inválido
            </Typography>
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="telefone"
            id="phone"
            autoComplete="current-phone"
            defaultValue={selectedContact?.number}
            onChange={() => setPhoneError(false)}
          />

          {phoneError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Número inválido
            </Typography>
          )}

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
