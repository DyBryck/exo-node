import fs from "fs";
import path from "path";

const logFilePath = path.join("..", "utils", "logs.txt");

const appendLog = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
};

export { appendLog };
