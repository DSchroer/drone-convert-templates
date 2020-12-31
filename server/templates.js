const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const fs = require('fs');
const yaml = require('js-yaml');

exports.templates = async function () {
    const files = await glob("./templates/**/*.yml");

    const templateMap = new Map();
    files.forEach(file => {
        const name = path.basename(file, path.extname(file));
        const template = loadTemplate(file);
        templateMap.set(name, template);
    });

    return templateMap;
}

function loadTemplate(path) {
    const rawTemplate = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    const steps = rawTemplate.steps;
    delete rawTemplate.steps;
    return {
        steps,
        root: rawTemplate
    }
}