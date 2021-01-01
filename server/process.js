const { merge } = require("lodash");

exports.process = function (doc, known) {
    doc.steps.filter(step => !!step.template).forEach(step => {
        const index = doc.steps.indexOf(step);
        const templateFn = known.get(step.template);

        const template = templateFn(step);
        const start = doc.steps.slice(0, index);
        const rest = doc.steps.slice(index + 1);

        doc.steps = start.concat(template.steps, rest)
        doc = merge(doc, template.root);
    });

    return doc;
}