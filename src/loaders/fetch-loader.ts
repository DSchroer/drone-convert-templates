import { parse } from "https://deno.land/std@0.83.0/encoding/yaml.ts";

import {
  RawTemplate,
  TemplateFactory,
  TemplateLoader,
} from "./template-loader.ts";
import { DroneDoc, DroneStep, TemplateStep } from "../drone-doc.ts";
import { registerHelpers } from "../helpers.ts";
import { compile } from "../utils/handlebars.ts";

export class FetchLoader implements TemplateLoader {

  constructor(
    private readonly baseUrl: string,
    private readonly ext: string = ".hbs",
  ) {
    registerHelpers();
  }

  async loadTemplate(name: string): Promise<TemplateFactory> {
    const templateUrl = new URL(name + this.ext, this.baseUrl);
    const res = await fetch(templateUrl);
    const tempalteText = await res.text();

    return this.loadHandlebarTemplate(tempalteText);
  }

  private loadHandlebarTemplate(rawTemplate: string) {
    const template = compile(rawTemplate);

    return async (step: TemplateStep) => {
      const rendered = template(step);
      const yamlData = <RawTemplate> parse(rendered);

      const steps = <DroneStep[]> yamlData.steps;
      delete yamlData.steps;
      return {
        steps,
        root: yamlData as unknown as DroneDoc,
      };
    };
  }
}
