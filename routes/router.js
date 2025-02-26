import { articleRoutes } from "./articles.js";
import { userRoutes } from "./users.js";

const routes = {
  ...articleRoutes,
  ...userRoutes,
};

export const handleRoute = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const segments = parsedUrl.pathname.split("/").filter(Boolean);
  const method = req.method;
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
};
