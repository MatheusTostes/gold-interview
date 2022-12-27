import * as React from "react";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/system";
import {
  Avatar,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Register = () => {
  const { handleRegister } = React.useContext(AuthContext);
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [emailInUseError, setEmailInUseError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = await handleRegister(userData);

    console.log(response.response.data.message);

    if (response.response.data.message === "Email already in use") {
      setEmailInUseError(true);
    } else if (response.response.data.message === "Invalid email") {
      setEmailError(true);
    } else if (
      response.response.data.message === "Password length must be 6 or higher"
    ) {
      setPasswordError(true);
    } else if (response.response.data.message === "Invalid name") {
      setNameError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre sua conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="nome"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={() => setNameError(false)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={() => {
              setEmailError(false);
              setEmailInUseError(false);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="senha"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={() => setPasswordError(false)}
          />

          {nameError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Insira um nome válido
            </Typography>
          )}

          {emailError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Insira um e-mail válido
            </Typography>
          )}

          {emailInUseError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              E-mail ja cadastrado
            </Typography>
          )}

          {passwordError && (
            <Typography
              style={{
                color: "#dc1471",
                fontSize: 11,
                marginLeft: 10,
              }}
            >
              Insira uma senha de 6 caracteres ou mais
            </Typography>
          )}

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Permanecer conectado"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="primary"
          >
            Cadastrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Já possui conta? Conecte-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  );
};
