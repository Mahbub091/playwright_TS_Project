import { createLogger, format, transports } from "winston";
import fs from "fs";
import { allure } from "allure-playwright";

const LOG_FILE_PATH = "reports/test_log/test-logs.log";

if (fs.existsSync(LOG_FILE_PATH)) {
  fs.unlinkSync(LOG_FILE_PATH);
}

const baseLogger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: LOG_FILE_PATH }),
  ],
});

const logger = {
  info: (message: string | string[]) => {
    baseLogger.info(message);
    allure.step(
      Array.isArray(message) ? message.join(", ") : message,
      async () => Promise.resolve(),
    );
  },
  error: (message: string | string[]) => {
    baseLogger.info(message);
    allure.step(
      Array.isArray(message) ? message.join(", ") : message,
      async () => Promise.resolve(),
    );
  },
};

export default logger;
