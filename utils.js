import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";

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
  execSync(`git clone --no-hardlinks ${url} ${dir}`, { stdio: "inherit" });
  deleteFolder(getPath(dir, '.git'));
};

const getFolderFiles = (folder) => fs.readdirSync(folder);

const itemExists = (folder) => fs.existsSync(folder);

const isDirectory = (path) => fs.statSync(path).isDirectory();

const getPath = (...parts) => path.join(...parts);

const readFile = (file) => fs.readFileSync(file, 'utf-8');

const writeFile = (file, content) => fs.writeFileSync(file, content)

const handleUnwantedFile = (file, repoDir) => {
    switch(file) {
        case 'package.json':
          const filePath = getPath(repoDir, file);
            return {
              fieldToUpdate: 'gitPackageJson',
              data: {...JSON.parse(readFile(filePath))}
            }
    }
}



export {
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
};
