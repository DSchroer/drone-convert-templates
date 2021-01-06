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
  const configYaml = yaml.parse(body.config.data) as DroneDoc;
  
  const resYaml = await applyTemplates(configYaml, loader);

  ctx.response.body = { data: yaml.stringify(resYaml) };
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
