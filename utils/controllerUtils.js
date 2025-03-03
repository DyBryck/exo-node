import { BadRequestError, NotFoundError } from "./errors/customErrors.js";

const defaultSuccessCodes = {
  GET: 200,
  POST: 201,
  PUT: 200,
  DELETE: 200,
};

export const handleRequest = async (req, res, callback) => {
  try {
    const data = await callback(req.body);
    const code = defaultSuccessCodes[req.method] || 200;
    res.status(code).json(data);
  } catch (error) {
    let statusCode;
    if (error instanceof NotFoundError) {
      statusCode = 404;
    } else if (error instanceof BadRequestError) {
      statusCode = 400;
    } else {
      statusCode = 500;
    }
    res.status(statusCode).json({ error: error.message });
  }
};
