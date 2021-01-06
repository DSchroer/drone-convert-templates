import HandlebarsJS from "https://dev.jspm.io/handlebars@4.7.6";

export function registerHelper(name: string, helper: unknown): void {
    // deno-lint-ignore no-explicit-any
    return (HandlebarsJS as any).registerHelper(name, helper);
}

export function compile(template: string): (context: unknown) => string {
    // deno-lint-ignore no-explicit-any
    return (HandlebarsJS as any).compile(template)
}