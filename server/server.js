import express from "express";
import routes from "../routes/routes.js";
import { connectMongo } from "../utils/mongoConnection.js";

const app = express();

app.use(express.json());

connectMongo();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

app.use("/", routes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
