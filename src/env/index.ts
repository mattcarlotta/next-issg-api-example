/* eslint-disable */
import dotenv from "dotenv";
import { statSync } from "fs";
import { resolve } from "path";
import { logInfoMessage, logErrorMessage } from "~logger";

const { NODE_ENV } = process.env;
const path = `src/env/.env.${NODE_ENV}`;

try {
  if (statSync(resolve(path)).isFile()) {
    dotenv.config({ path });

    logInfoMessage(`Using ${NODE_ENV} environment variables.`);
  }
} catch (e) {
  logErrorMessage(`Missing ${NODE_ENV} environment variables!`);
  process.exit(1);
}
/* eslint-enable */
