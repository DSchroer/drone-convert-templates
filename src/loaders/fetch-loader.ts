import fetch from "node-fetch";
import Yaml from "js-yaml";
import Handlebars from "handlebars";

import { RawTemplate, TemplateFactory, TemplateLoader } from "./template-loader";
import { DroneDoc, DroneStep, TemplateStep } from "../drone-doc";
import { registerHelpers } from "../helpers";

export class FetchLoader implements TemplateLoader {

    constructor(private readonly baseUrl: string, private readonly ext: string = ".hbs"){
        registerHelpers();
    }

    async loadTemplate(name: string): Promise<TemplateFactory> {
        const templateUrl = new URL(name + this.ext, this.baseUrl);        
        const res = await fetch(templateUrl);
        const tempalteText = await res.text();

        return this.loadHandlebarTemplate(tempalteText);
    }

    private loadHandlebarTemplate(rawTemplate: string) {
        const handlebar = Handlebars.compile(rawTemplate);
    
        return (step: TemplateStep) => {
            const rendered = handlebar(step);
            const yamlData = <RawTemplate>Yaml.safeLoad(rendered);
    
            const steps = <DroneStep[]>yamlData.steps;
            delete yamlData.steps;
            return {
                steps,
                root: <DroneDoc>yamlData
            }
        }
    }
}
