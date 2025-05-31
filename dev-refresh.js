#!/usr/bin/env node

import {
  deleteFolder,
  getFolderFiles,
  deleteFile,
  isDirectory,
  writeFile,
  readFile,
} from './utils.js';

const allowed = ['index.js', 'package.backup.json', 'README.md', 'utils.js', 'dev-refresh.js', '.git'];

const files = getFolderFiles('.');

for(let file of files) {
  if(allowed.includes(file)) {
    continue;
  }

  if(isDirectory(file)) {
    deleteFolder(file);
    continue;
  }

  deleteFile(file);
}

const packageBackup = readFile('package.backup.json');
writeFile('package.json', packageBackup);