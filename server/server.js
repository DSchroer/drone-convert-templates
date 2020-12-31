const express = require("express");
const { process } = require("./process");
const { templates } = require("./templates");
const yaml = require('js-yaml');

(async () => {
    const known = await templates();
    const app = express();

    app.use(express.json());
    app.post('/', (req, res) => {
        const config = req.body.config.data;

        const configYaml = yaml.safeLoad(config);
        const resYaml = process(configYaml, known);
        
        res.json({ data: resYaml });
    });

    app.listen(8080, () => {
        console.log("Application started on port 8080...")
    });
})();
