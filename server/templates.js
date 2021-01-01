const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const fs = require('fs');
const yaml = require('js-yaml');
const Handlebars = require("handlebars");

Handlebars.registerHelper('choose', function (a, b) {return a ? a : b;})

exports.templates = async function () {
    const files = await glob("./templates/**/*");

    const templateMap = new Map();
    files.forEach(file => {
        const ext = path.extname(file);
        const name = path.basename(file, ext);

        let template
        if (ext === ".hbs") {
            template = loadHandlebarTemplate(file);
        }else {
            template = loadYamlTemplate(file);
        }

        templateMap.set(name, template);
    });

    return templateMap;
}

function loadYamlTemplate(path) {
    const rawTemplate = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    const steps = rawTemplate.steps;
    delete rawTemplate.steps;
    return () => ({
        steps,
        root: rawTemplate
    })
}

function loadHandlebarTemplate(path) {
    const rawTemplate = fs.readFileSync(path, 'utf8');
    const handlebar = Handlebars.compile(rawTemplate);

    return (step) => {
        const rendered = handlebar(step);
        const yamlData =  yaml.safeLoad(rendered);

        const steps = yamlData.steps;
        delete yamlData.steps;
        return {
            steps,
            root: yamlData
        }
    }
}