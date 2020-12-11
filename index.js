import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { apiConfig } from "../../../config";
// import * as index from "./index-handler";
import * as login from "./login";
import * as register from "./register";
import * as updatePassword from "./updatePassword";
import * as getDetails from "./getDetails";
import * as rentScooter from "./rentScooter";
import * as walletDetails from "./walletDetails";
import * as addActivity from "./addActivity";
import * as rewardBalance from "./rewardBalance";
import * as buyMoreToekns from "./buyMoreToekns";

const app = express();

app.use(
  "*",
  cors({
    origin: apiConfig.allowedOrigins || "*",
  })
);
app.use(bodyParser.json());

register.handler(app);
login.handler(app);
updatePassword.handler(app);
getDetails.handler(app);
rentScooter.handler(app);
walletDetails.handler(app);
addActivity.handler(app);
rewardBalance.handler(app);
buyMoreToekns.handler(app);
// index.handler(app);

app.use((err, _, res, next) => {
  // Express error handler
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  return res.status(500).send({
    error: "An error ocurred. Error info was logged.",
  });
});

export async function startApi() {
  console.info(`${new Date().toISOString()} | Starting API server...`);
  return new Promise((resolve) => {
    app.listen(apiConfig.port, apiConfig.host, () => {
      console.info(
        `${new Date().toISOString()} | API is up and running at http://${
          apiConfig.host
        }:${apiConfig.port}`
      );
      resolve();
    });
  });
}
