import { registerHelper } from "./handlebars.ts";

export function registerHelpers() {
  registerHelper("choose", (a: unknown, b: unknown) => (a ? a : b));
}
