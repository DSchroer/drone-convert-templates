import Koa from "koa";
import Router from "@koa/router";
import Yaml from "js-yaml";
import json from "koa-json"
import bodyParser from "koa-bodyparser";

import { applyTemplates } from "./apply-templates";
import { DroneDoc } from "./drone-doc";
import { FetchLoader } from "./loaders/fetch-loader";

const templateUrl = process.env.TEMPLATE_URL;
if(!templateUrl){
    throw new Error("TEMPLATE_URL variable is required.")
}

const loader = new FetchLoader(templateUrl);

const router = new Router();
router.post('/', async (ctx) => {
    const configYaml = <DroneDoc>Yaml.safeLoad(ctx.request.body.config.data);
    const resYaml = await applyTemplates(configYaml, loader);
    ctx.body = { data: Yaml.safeDump(resYaml) };
});

const app = new Koa();

app.use(bodyParser());
app.use(json());
app.use(router.routes());
app.listen(8080);
