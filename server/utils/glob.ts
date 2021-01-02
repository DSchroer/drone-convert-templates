import { promisify } from "util";
import { glob as origGlob } from "glob"

export const glob = promisify(origGlob);
