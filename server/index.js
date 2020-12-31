const yaml = require('js-yaml');
const fs = require('fs');
const { templates } = require("./templates");
const { process } = require("./process");

(async () => {
    const known = await templates();

    let doc = yaml.safeLoad(fs.readFileSync('example.yml', 'utf8'));

    console.log(process(doc, known))
})()

