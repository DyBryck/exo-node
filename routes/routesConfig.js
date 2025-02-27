import { articleRoutes } from "./articles.js";
import { userRoutes } from "./users.js";

export const routesList = [
  // Articles
  {
    method: "GET",
    regex: /^\/articles$/,
    handler: articleRoutes["GET /articles"],
  },
  {
    method: "GET",
    regex: /^\/articles\/(\d+)$/,
    handler: articleRoutes["GET /articles/:id"],
  },
  {
    method: "POST",
    regex: /^\/articles$/,
    handler: articleRoutes["POST /articles"],
  },
  {
    method: "PUT",
    regex: /^\/articles\/(\d+)$/,
    handler: articleRoutes["PUT /articles/:id"],
  },
  {
    method: "DELETE",
    regex: /^\/articles\/(\d+)$/,
    handler: articleRoutes["DELETE /articles/:id"],
  },

  // Users
  {
    method: "GET",
    regex: /^\/users$/,
    handler: userRoutes["GET /users"],
  },
  {
    method: "GET",
    regex: /^\/users\/(\d+)$/,
    handler: userRoutes["GET /users/:id"],
  },
  {
    method: "GET",
    regex: /^\/users\/(\d+)\/articles$/,
    handler: userRoutes["GET /users/:id/articles"],
  },
  {
    method: "POST",
    regex: /^\/users$/,
    handler: userRoutes["POST /users"],
  },
  {
    method: "PUT",
    regex: /^\/users\/(\d+)$/,
    handler: userRoutes["PUT /users/:id"],
  },
  {
    method: "DELETE",
    regex: /^\/users\/(\d+)$/,
    handler: userRoutes["DELETE /users/:id"],
  },
];
