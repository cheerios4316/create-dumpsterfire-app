#!/usr/bin/env node

import {
  moveHere,
  deleteFolder,
  cloneRepo,
  getFolderFiles,
  folderExists,
  deleteFile,
  isDirectory,
  getPath,
  readFile,
  writeFile
} from './utils.js';

const repoUrl = "https://github.com/cheerios4316/poteriforti.git";

const args = process.argv;

const cloneDir = "temp-clone";

let gitPackageJson = {};

const unwantedFiles = ['package.json']
const unwantedFolders = ['.git']

const handleUnwantedFile = (file, readFileCallback) => {
    switch(file) {
        case 'package.json':
            gitPackageJson = {...readFileCallback(getPath(cloneDir, file))}
            break;
    }
}

if (folderExists(cloneDir)) {
  deleteFolder(cloneDir);
}

cloneRepo(repoUrl, cloneDir)

const files = getFolderFiles(cloneDir);

for (const file of files) {
    if (isDirectory(getPath(cloneDir, file))) {
        if (unwantedFolders.includes(file)) {
            deleteFolder(file);
            continue;
        }
    } else {
        if (unwantedFiles.includes(file)) {
            handleUnwantedFile(file, readFile);
            deleteFile(getPath(cloneDir, file));
            continue;
        }
    }
  moveHere(cloneDir, file);
}

deleteFolder(cloneDir);