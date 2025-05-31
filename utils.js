import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const moveHere = (folder, file) => {
  fs.cpSync(path.join(folder, file), file, { recursive: true });
};

const deleteFolder = (folder) => {
  fs.rmSync(folder, { recursive: true, force: true });
};

const deleteFile = (folder, file) => {
  let args = [folder, file]
  if(!file) {
    args = [folder];
  }
  fs.rmSync(path.join(...args), { force: true });
};

const cloneRepo = (url, dir) => {
  execSync(`git clone ${url} ${dir}`, { stdio: "inherit" });
};

const getFolderFiles = (folder) => fs.readdirSync(folder);

const folderExists = (folder) => fs.existsSync(folder);

const isDirectory = (path) => fs.statSync(path).isDirectory();

const getPath = (...parts) => path.join(...parts);

const readFile = (file) => fs.readFileSync(file, 'utf-8');

const writeFile = (file, content) => fs.writeFileSync(file, content)

export {
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
};
