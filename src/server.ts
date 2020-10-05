import "~env";
import express from "express";
import middlewares from "~middlewares";
import { connectToDB } from "~database";
import routes from "~routes";
import { logInfoMessage, logErrorMessage } from "~logger";

const { CLIENT, PORT } = process.env;

(async () => {
  try {
    await connectToDB();

    const server = express();

    middlewares(server);

    server.use("/api", routes);

    server.listen(PORT, (err?: Error) => {
      if (err) throw err;
      logInfoMessage(`Listening for requests from: \x1b[1m${CLIENT}\x1b[0m`);
    });
  } catch (err) {
    logErrorMessage(err.toString());
    process.exit(1);
  }
})();
