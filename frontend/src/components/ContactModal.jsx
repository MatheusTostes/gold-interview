import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField } from "@mui/material";
import { ConfirmationModal } from "./ConfirmationModal";
import api from "../helpers/api";
// import { MuiTelInput } from "mui-tel-input";

// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect } from "react";

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
  const [phoneInUseError, setPhoneInUseError] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("55");

  const handleResetStates = () => {
    setNameError(false);
    setPhoneError(false);
    setPhoneInUseError(false);
    handleContactModalClose();
    setPhoneNumber("+55");
  };

  useEffect(() => {
    if (selectedContact?.number) {
      setPhoneNumber(selectedContact?.number);
    }
  }, [selectedContact]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const dataContact = {
      id: selectedContact?.id,
      name: data.get("name"),
      // number: data.get("phone"),
      number: phoneNumber,
    };

    if (dataContact.name === "") {
      setNameError(true);
      return;
    } else if (
      !dataContact?.number ||
      (dataContact?.number.includes("55") &&
        (dataContact?.number === "" ||
          dataContact?.number?.length < 12 ||
          dataContact?.number?.length > 13))
    ) {
      setPhoneError(true);
      return;
    }

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
          // handleContactModalClose();
          handleResetStates();
        } catch (error) {
          if (error.response.data.message.includes("name")) setNameError(true);
          if (error.response.data.message.includes("Invalid number"))
            setPhoneError(true);
          if (error.response.data.message.includes("Number already in use"))
            setPhoneInUseError(true);
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
        setPhoneInUseError={setPhoneInUseError}
      />
      <Modal
        open={contactModalOpen}
        onClose={handleResetStates}
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

          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="telefone"
            id="phone"
            autoComplete="current-phone"
            defaultValue={selectedContact?.number}
            onChange={() => {
              setPhoneError(false);
              setPhoneInUseError(false);
            }}
          /> */}

          <PhoneInput
            // style={{ height: "100px" }}
            inputStyle={{
              height: "55px",
              width: "100%",
              border: "1px solid #aeb3b9",
              padding: "16.5px 14px 16.5px 50px",
              borderRadius: "4px",
              fontSize: "17px",
              fontWeight: "500",
            }}
            country={"BR"}
            placeholder="telefone *"
            value={phoneNumber}
            onChange={setPhoneNumber}
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

          {phoneInUseError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Número já cadastrado
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
