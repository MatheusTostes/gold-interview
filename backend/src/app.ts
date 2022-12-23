import express from "express";
import contactsRoutes from "./routes/contacts";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";

const port = 8081;
const app = express();

app.use(json());

app.use(urlencoded({ extended: true })); //pesquisar

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/contacts", contactsRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
