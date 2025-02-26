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

export const handleRequest = async (req, res, callback, successCode = 200) => {
  try {
    const body =
      req.method === "POST" || req.method === "PUT"
        ? await parseRequestBody(req)
        : null;
    const data = await callback(body);
    sendResponse(res, successCode, data);
  } catch (error) {
    sendResponse(res, error.status || 500, null, error.message);
  }
};
