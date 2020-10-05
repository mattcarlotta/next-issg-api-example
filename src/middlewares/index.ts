import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { Express } from "~types";

const { CLIENT, NODE_ENV } = process.env;
const inTesting = NODE_ENV === "test";
const inProduction = NODE_ENV === "production";

const middlewares = (app: Express): void => {
  if (!inTesting) {
    app.use(
      morgan(
        inProduction
          ? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
          : "tiny",
      ),
    ); // logging framework
  }
  if (inProduction) {
    app.use(
      compression({
        level: 6, // set compression level from 1 to 9 (6 by default)
        filter: (req, res) =>
          req.headers["x-no-compression"]
            ? false
            : compression.filter(req, res), // set predicate to determine whether to compress
      }),
    );
  }
  app.use(
    cors({
      origin: CLIENT,
    }),
  ); // allows receiving of cookies/tokens from front-end
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.set("json spaces", 2); // sets JSON spaces for clarity
};

export default middlewares;
