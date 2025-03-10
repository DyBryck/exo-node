import http from "http";
import { handleRoute } from "../routes/router.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  handleRoute(req, res);
});

server.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
