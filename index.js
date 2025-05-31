#!/usr/bin/env node

import {
  moveHere,
  deleteFolder,
  cloneRepo,
  getFolderFiles,
  itemExists,
  deleteFile,
  isDirectory,
  getPath,
  readFile,
  writeFile,
  handleUnwantedFile
} from './utils.js';

const repoUrl = "https://github.com/cheerios4316/poteriforti.git";

const args = process.argv;

const cloneDir = "temp-clone";

let gitPackageJson = {};
let currentPackageJson = undefined;

const unwantedFiles = ['package.json', 'README.md']
const unwantedFolders = ['.git']

if (itemExists(cloneDir)) {
  deleteFolder(cloneDir);
}

if(itemExists('package.json')) {
    currentPackageJson = {...JSON.parse(readFile('package.json'))}
}

cloneRepo(repoUrl, cloneDir)

const files = getFolderFiles(cloneDir);

for (const file of files) {
    if (isDirectory(getPath(cloneDir, file))) {
        if (unwantedFolders.includes(file)) {
            continue;
        }
    } else {
        if (unwantedFiles.includes(file)) {
            const update = handleUnwantedFile(file, cloneDir);

            deleteFile(getPath(cloneDir, file));

            if(update?.fieldToUpdate) {
                switch(update.fieldToUpdate) {
                    case 'gitPackageJson':
                        gitPackageJson = update.data;
                }
            }
            continue;
        }
    }
  moveHere(cloneDir, file);
}

let resultJson = {};

if(currentPackageJson) {
    resultJson = {
        ...currentPackageJson,
        scripts: {
            ...(currentPackageJson.scripts ? currentPackageJson.scripts : {}),
            ...gitPackageJson.scripts
        },
        dependencies: {
            ...(currentPackageJson.dependencies ? currentPackageJson.dependencies : {}),
            ...gitPackageJson.dependencies
        },
        devDependencies: {
            ...(currentPackageJson.devDependencies ? currentPackageJson.devDependencies : {}),
            ...gitPackageJson.devDependencies
        }
    }
} else {
    resultJson = {
        ...gitPackageJson,
        name: 'Your Dumpsterfire App',
        author: '<your name>'
    }
}

writeFile("package.json", JSON.stringify(resultJson));

process.on('exit', () => {
  try { deleteFolder(cloneDir); } catch (e) {console.log(e)}
});
