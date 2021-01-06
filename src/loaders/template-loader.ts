import { DroneDoc, DroneStep, TemplateStep } from "../drone-doc.ts";

export interface TemplateLoader {
  loadTemplate(name: string): Promise<TemplateFactory>;
}

export interface TemplateFactory {
  (step: TemplateStep): Promise<Template>;
}

export interface RawTemplate {
  steps?: DroneStep[];
  root: DroneDoc;
}

export interface Template {
  steps: DroneStep[];
  root: DroneDoc;
}
