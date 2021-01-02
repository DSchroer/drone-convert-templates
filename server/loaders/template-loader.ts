import { DroneDoc, DroneStep, TemplateStep } from "../drone-doc";

export interface TemplateLoader {
    loadTemplate(name: string): Promise<TemplateFactory>;
}

export interface TemplateFactory {
    (step: TemplateStep): Template
}

export interface RawTemplate {
    steps?: DroneStep[]
    root: DroneDoc
}

export interface Template {
    steps: DroneStep[]
    root: DroneDoc
}
