const { process } = require("../server/process");
const { templates } = require("../server/templates");

describe("simple", () => {
    const doc = {
        steps: [
            { 
                template: "terraform",
                work_dir: "testdir"
            }
        ]
    }
    let known;

    beforeAll(async () => {
        known = await templates();
    })

    it("replaces steps", () => {
        const res = process(doc, known);
        
        expect(res.steps[0].commands[0]).toEqual("cd testdir");
    });
});
