import { routesList } from "./routesConfig.js";

export const handleRoute = (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  const route = routesList.find(
    (r) => r.method === method && r.regex.test(pathname),
  );

  if (route) {
    const matches = pathname.match(route.regex);

    const param =
      matches && matches.length > 1 ? parseInt(matches[1], 10) : null;
    return route.handler(req, res, param);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route non trouvée" }));
};
