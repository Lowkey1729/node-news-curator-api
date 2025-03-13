import { Application } from "express";

import { routePrefix } from "@app/config/route.prefix.config";
import { articleRouter } from "@app/modules/articles/articles.routes";

export default (app: Application) => {
  app.use(`${routePrefix.coreRouteV1}/articles`, articleRouter);
};
