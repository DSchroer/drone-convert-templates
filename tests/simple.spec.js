const { process } = require("../server/process");
const { templates } = require("../server/templates");

describe("simple", () => {
    const doc = {
        steps: [
            { template: "compose-deploy" }
        ]
    }
    let known;

    beforeAll(async () => {
        known = await templates();
    })

    it("replaces steps", () => {
        const res = process(doc, known);

        expect(res.steps[0]).toMatchObject({
            name: "compose-deploy",
            image: "docker/compose:1.27.4"
        });
    })
});