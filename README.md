# Drone: Convert Templates

Simplify and share your drone pipeline steps using templates. Rather than copy-pasting large steps between projects, define a template and reference it. 

## Example

Reference a template step by creating a step using the `template` keyword. This will be converted by the plugin and return a filled out build step.

`.drone.yml`:

```yml
---
kind: pipeline
type: docker
name: build

steps:
  - template: my-build-template
```

Elsewhere define a template that contains the full build step. You can use handlebars templates to pass variables to the templates. 

`my-build-template.hbs`:

```hbs
---
steps:
  - name: {{choose name 'example-template'}}
    image: alpine
    commands:
      - echo "Hello world!"
```

## Installation:

Make sure that your templates are stored somewhere accessible via HTTP. The template server will pull from the `TEMPLATE_BASE_URL` in order to retrieve them. 

Deploy this image to the same network as your Drone server. Use the `DRONE_CONVERT_PLUGIN_ENDPOINT` parameter to connect the template service.

```yaml
services:
  drone:
    image: drone/drone
    environment:
      DRONE_CONVERT_PLUGIN_ENDPOINT: http://drone-convert-templates:8080/
      DRONE_CONVERT_PLUGIN_SECRET: <CONVERT_PLUGIN_SECRET>

  drone-convert-templates:
    image: dschroer/drone-convert-templates
    environment:
      DRONE_CONVERT_PLUGIN_SECRET: <CONVERT_PLUGIN_SECRET>
      TEMPLATE_URL: <TEMPLATE_BASE_URL>
    expose:
      - 8080
```

## Templates

All templates are in the same format as drone pipelines. The `steps` in the template will be spliced into the step where it is referenced. The rest of the template will be merged with the original build pipeline.

All templates must be `.hbs` files. The server will make a HTTP GET request to `${TEMPLATE_URL}/${TEMPLATE_NAME}.hbs` to load the data.

### Template variables

Any additional properties defined within a template step is passed to the template. They can be referenced using [handlebars](https://handlebarsjs.com/) style variables. 

### Template helpers

There are a few built in helpers that can assist in making templates:

|Name|Description|Example|
|---|---|---|
|`choose`|Picks the first defined value of two options| `{{choose param 'default'}}` |