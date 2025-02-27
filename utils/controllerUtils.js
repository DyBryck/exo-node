import { BadRequestError, NotFoundError } from "./errors/customErrors.js";

export const sendResponse = (res, statusCode, data = null, error = null) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(error ? { error } : data));
};

export const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      if (!body) return reject({ status: 400, message: "Aucun contenu reçu" });
      try {
        const parsedData = JSON.parse(body);
        resolve(parsedData);
      } catch (err) {
        console.error("❌ Erreur JSON:", err.message);
        reject({ status: 400, message: "Format JSON invalide" });
      }
    });
    req.on("error", () => reject({ status: 500, message: "Erreur serveur" }));
  });
};

const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

export const handleRequest = async (req, res, callback) => {
  try {
    const body =
      req.method === "POST" || req.method === "PUT"
        ? await parseRequestBody(req)
        : null;
    const data = await callback(body);
    const code = defaultSuccessCodes[req.method] || 200;
    sendResponse(res, code, data);
  } catch (error) {
    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }
    sendResponse(res, statusCode, null, error.message);
  }
};
