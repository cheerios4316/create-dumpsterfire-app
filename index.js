#!/usr/bin/env node

import { createDumpsterfireApp } from "./src/createDumpsterfireApp.js";
import { handleAction } from "./src/handleAction.js";

const [, , ...args] = process.argv;

console.log(args);

switch (args.length) {
    case 0:
        createDumpsterfireApp();
        break;
    case 1:
        await handleAction(args[0]);
        break;
}

process.exit(1);
