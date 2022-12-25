import { Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { ContactsTable } from "../../components/ContactsTable";
import { UserDrawer } from "../../components/UserDrawer";

const contacts = [
  { id: 1, name: "Cupcake", number: 27998851973 },
  { id: 2, name: "Donut", number: 27998851973 },
  { id: 3, name: "Eclair", number: 27998851973 },
  { id: 4, name: "Frozen yoghurt", number: 27998851973 },
];

export const Contacts = () => {
  return (
    <>
      <Container>
        {/* <UserDrawer childrenComponent={<ContactsTable contacts={contacts} />} /> */}
        <UserDrawer />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          + Novo Contato
        </Button>
        <ContactsTable contacts={contacts} />
      </Container>
    </>
  );
};
