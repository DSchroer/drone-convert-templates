import { oak, yaml } from "./deps.ts";
import { applyTemplates } from "./apply-templates.ts";
import { DroneDoc } from "./drone-doc.ts";
import { FetchLoader } from "./loaders/fetch-loader.ts";

const templateUrl = Deno.env.get("TEMPLATE_URL");
if (!templateUrl) {
  throw new Error("TEMPLATE_URL variable is required.");
}

const loader = new FetchLoader(templateUrl);

const router = new oak.Router();
router.post("/", async (ctx) => {
  const bodyJson = await ctx.request.body({ type: "json" });
  const body = await bodyJson.value;
  let configYaml = yaml.parseAll(body.config.data) as DroneDoc | DroneDoc[];

  if (!Array.isArray(configYaml)) {
    configYaml = [configYaml];
  }

  const resDocs = await Promise.all(
    configYaml.map((yml) => applyTemplates(yml, loader)),
  );
  const pipelines = resDocs.map((doc) => yaml.stringify(doc));
  const pipeline = pipelines.join("\n---\n");

  ctx.response.body = { data: pipeline };
});

const app = new oak.Application();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.response.status = 500;
    ctx.response.body = JSON.stringify({ error: e });
  }
});
app.use(router.routes());

await app.listen({ port: 8080 });
