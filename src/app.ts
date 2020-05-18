import express from "express";

import winston from "winston";

const app = express();
import logging from "./startup/startup-logging";
logging();
import startupRoutes from "./startup/startup-routes";
startupRoutes(app);
import config from "./startup/startup-config";
config();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

export { app };
