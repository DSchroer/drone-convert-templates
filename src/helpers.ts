import { registerHelper } from "./utils/handlebars.ts";

export function registerHelpers() {
  registerHelper("choose", (a: unknown, b: unknown) => (a ? a : b));
}
