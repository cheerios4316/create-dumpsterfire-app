#!/usr/bin/env node

import { createDumpsterfireApp, logEnding } from "./src/createDumpsterfireApp.js";
import { handleAction } from "./src/handleAction.js";

const [, , ...args] = process.argv;

console.log(args);

switch (args.length) {
    case 0:
        createDumpsterfireApp();
        logEnding();
        break;
    default:
        await handleAction(...args);
        break;
}

process.exit(1);
