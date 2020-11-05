import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { apiConfig } from "../../../config";
import * as index from "./index-handler";
import * as request from "./request";
import * as confirm from "./confirm";
import * as status from "./status";
import * as login from "./login";
import * as register from "./register";
import * as getBalance from "./getBalance";
import * as createAccount from "./createAccount";
import * as transaction from "./transaction";

const app = express();

app.use('*', cors({
  origin: apiConfig.allowedOrigins || '*'
}));
app.use(bodyParser.json());

register.handler(app)
login.handler(app)
getBalance.handler(app)
createAccount.handler(app)
transaction.handler(app)
index.handler(app);
request.handler(app);
confirm.handler(app);
status.handler(app);

app.use((err, _, res, next) => { // Express error handler
  if (res.headersSent) {
      return next(err);
  }
  console.error(err);
  return res.status(500).send({
    error: "An error ocurred. Error info was logged."
  });
});

export async function startApi () {
  console.info(`${ new Date().toISOString() } | Starting API server...`);
  return new Promise((resolve) => {
    app.listen(apiConfig.port, apiConfig.host, () => {
      console.info(`${ new Date().toISOString() } | API is up and running at http://${ apiConfig.host }:${ apiConfig.port }`);
      resolve();
    });
  });
}
