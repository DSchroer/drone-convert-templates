import { handlebars } from "../deps.ts";

export function registerHelper(name: string, helper: unknown): void {
  // deno-lint-ignore no-explicit-any
  return (handlebars as any).registerHelper(name, helper);
}

export function compile(template: string): (context: unknown) => string {
  // deno-lint-ignore no-explicit-any
  return (handlebars as any).compile(template);
}
