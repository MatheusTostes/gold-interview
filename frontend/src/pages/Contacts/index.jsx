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
  { id: 5, name: "Gingerbread", number: 27998851973 },
  { id: 6, name: "Honeycomb", number: 27998851973 },
  { id: 7, name: "Ice cream sandwich", number: 27998851973 },
  { id: 8, name: "Jelly Bean", number: 27998851973 },
  { id: 9, name: "KitKat", number: 27998851973 },
  { id: 10, name: "Lollipop", number: 27998851973 },
  { id: 11, name: "Marshmallow", number: 27998851973 },
  { id: 12, name: "Nougat", number: 27998851973 },
  { id: 13, name: "Oreo", number: 27998851973 },
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
