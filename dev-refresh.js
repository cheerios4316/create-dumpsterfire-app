#!/usr/bin/env node

import {
    deleteFolder,
    getFolderFiles,
    deleteFile,
    isDirectory,
    writeFile,
    readFile,
} from "./src/utils.js";

const allowed = [
    "index.js",
    "package.backup.json",
    ".gitignore.backup",
    "README.md",
    "dev-refresh.js",
    ".git",
    "src",
    "template",
    ".prettierrc",
    ".gitignore"
];

const files = getFolderFiles(".");

for (let file of files) {
    if (allowed.includes(file)) {
        continue;
    }

    if (isDirectory(file)) {
        deleteFolder(file);
        continue;
    }

    deleteFile(file);
}

const packageBackup = readFile("package.backup.json");
writeFile("package.json", packageBackup);

const gitignoreBackup = readFile(".gitignore.backup");
writeFile(".gitignore", gitignoreBackup);


