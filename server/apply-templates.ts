import { DroneDoc, DroneStep, TemplateStep } from "./drone-doc";
import { merge } from "lodash";
import { TemplateLoader } from "./loaders/template-loader";

export async function applyTemplates(doc: DroneDoc, loader: TemplateLoader) {
    const templateSteps = doc.steps.filter(isTemplateStep);

    for (const step of templateSteps) {
        const index = doc.steps.indexOf(step);
        const templateName = step.template;
        const templateFn = await loader.loadTemplate(templateName);

        const template = templateFn(step);
        const start = doc.steps.slice(0, index);
        const rest = doc.steps.slice(index + 1);

        doc.steps = start.concat(template.steps, rest)
        doc = merge(doc, template.root);
    }

    return doc;
}

function isTemplateStep(step: TemplateStep | DroneStep): step is TemplateStep {
    return !!step.template
}
