import {
  parse,
  stringify,
} from "https://deno.land/std@0.83.0/encoding/yaml.ts";
import { Application, Router } from "https://deno.land/x/oak@v6.4.1/mod.ts";

import { applyTemplates } from "./apply-templates.ts";
import { DroneDoc } from "./drone-doc.ts";
import { FetchLoader } from "./loaders/fetch-loader.ts";

const templateUrl = Deno.env.get("TEMPLATE_URL");
if (!templateUrl) {
  throw new Error("TEMPLATE_URL variable is required.");
}

const loader = new FetchLoader(templateUrl);

const router = new Router();
router.post("/", async (ctx) => {
  try {
    const bodyJson = await ctx.request.body({ type: "json" });
    const body = await bodyJson.value;

    const configYaml = parse(body.config.data) as DroneDoc;
    const resYaml = await applyTemplates(configYaml, loader);

    ctx.response.body = { data: stringify(resYaml) };
  } catch (e) {
    ctx.response.body = JSON.stringify({ error: e });
  }
});

const app = new Application();

app.use(router.routes());
await app.listen({ port: 8080 });
