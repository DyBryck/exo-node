import http from "http";
import url from "url";
import { articleRoutes } from "../routes/articles.js";
import { userRoutes } from "../routes/users.js";

const routes = {
  ...articleRoutes,
  ...userRoutes,
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const segments = path.split("/").filter(Boolean);
  let routeKey = "";
  if (segments[0] === "articles") {
    const id = segments[1] ? parseInt(segments[1]) : null;
    routeKey = id ? `${method} /articles/:id` : `${method} /articles`;
    if (routes[routeKey]) return routes[routeKey](req, res, id);
  } else if (segments[0] === "users") {
    const id = segments[1] ? parseInt(segments[1]) : null;
    if (segments[2] === "articles" && id) {
      routeKey = `${method} /users/:id/articles`;
      if (routes[routeKey]) return routes[routeKey](req, res, id);
    } else {
      routeKey = id ? `${method} /users/:id` : `${method} /users`;
      if (routes[routeKey]) return routes[routeKey](req, res, id);
    }
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route non trouvée" }));
});

server.listen(4000, () => console.log("Serveur en écoute sur le port 4000"));
