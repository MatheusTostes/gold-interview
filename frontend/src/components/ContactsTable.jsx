import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const ContactsTable = ({
  contacts,
  handleContactModalOpen,
  setContacts,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmationModalOpen, setConfirmationModalOpen] =
    React.useState(false);
  const [contactObject, setContactObject] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "id", label: "Id", minWidth: 170 },
    { id: "name", label: "Nome", minWidth: 170 },
    {
      id: "number",
      label: "Telefone",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Ações",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <ConfirmationModal
        confirmationModalOpen={confirmationModalOpen}
        setConfirmationModalOpen={setConfirmationModalOpen}
        contactObject={contactObject}
        action="delete"
        contacts={contacts}
        setContacts={setContacts}
      />
      <TableContainer sx={{ maxHeight: "65vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((contact, contactIndex) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${contactIndex}-contact`}
                >
                  <TableCell key={`${contactIndex}-id`}>{contact.id}</TableCell>
                  <TableCell key={`${contactIndex}-name`}>
                    {contact.name}
                  </TableCell>
                  {/* <TableCell key={`${contactIndex}-number`}>
                    {contact.number}
                  </TableCell> */}
                  <TableCell key={`${contactIndex}-number`}>
                    <PhoneInput
                      buttonStyle={{
                        border: "none",
                        background: "transparent",
                      }}
                      inputStyle={{
                        background: "transparent",
                        border: "none",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                      country={"BR"}
                      countryCodeEditable={false}
                      placeholder="telefone *"
                      value={contact.number}
                      disabled
                    />
                  </TableCell>

                  <TableCell
                    key={`${contactIndex}-edit`}
                    align="right"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <DeleteIcon
                      cursor="pointer"
                      style={{ color: "#dc1471" }}
                      onClick={() => {
                        setContactObject(contact);
                        setConfirmationModalOpen(true);
                      }}
                    />
                    <EditIcon
                      cursor="pointer"
                      color="primary"
                      onClick={() => handleContactModalOpen(contact)}
                    />

                    <a
                      href={`https://api.whatsapp.com/send?phone=55${contact.number}&text=Olá!`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsAppIcon
                        cursor="pointer"
                        style={{ color: "#25D366" }}
                      />
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Exibir"
      />
    </Paper>
  );
};
