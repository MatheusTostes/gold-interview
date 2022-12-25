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

export const ContactsTable = ({ contacts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      label: "Número",
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
      <TableContainer sx={{ maxHeight: 440 }}>
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
            {contacts.map((row, rowIndex) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${rowIndex}-row`}
                >
                  <TableCell key={`${rowIndex}-id`}>{row.id}</TableCell>
                  <TableCell key={`${rowIndex}-name`}>{row.name}</TableCell>
                  <TableCell key={`${rowIndex}-number`}>{row.number}</TableCell>

                  <TableCell
                    key={`${rowIndex}-edit`}
                    align="right"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <DeleteIcon cursor="pointer" style={{ color: "#dc1471" }} />
                    <EditIcon
                      cursor="pointer"
                      color="primary"
                      onClick={() => console.log("edit")}
                    />
                    <WhatsAppIcon
                      cursor="pointer"
                      style={{ color: "#25D366" }}
                    />
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
        labelRowsPerPage="Linhas por página"
      />
    </Paper>
  );
};
