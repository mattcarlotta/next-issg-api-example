require("../../env");
const { connectDatabase } = require("../index");
const { logErrorMessage, logInfoMessage } = require("../../logger");

const { DATABASE, DROP, EXIT } = process.env;

/**
 * Function to tear down the testing Mongo database.
 *
 * @function
 * @async
 * @function connectDatabase - connects to testing Mongo database.
 * @function dropDatabase - drops testing Mongo database.
 * @function close - closes connection to testing Mongo database.
 * @returns {string} - displays a:  PASS  utils/teardownDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/teardownDB.js message to console with the error.
 */

const teardownDB = () => {
  return new Promise(async (resolve, reject) => {
    const db = await connectDatabase();
    try {
      await db.dropDatabase();
      await db.close();

      logInfoMessage(
        `\x1b[2mutils/\x1b[0m\x1b[1mteardownDB.js\x1b[0m (${DATABASE})`,
      );

      if (EXIT) process.exit(0);

      return resolve();
    } catch (err) {
      logErrorMessage(`seedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`);
      return reject(process.exit(0));
    }
  });
};

if (DROP) teardownDB();

module.exports = teardownDB;
