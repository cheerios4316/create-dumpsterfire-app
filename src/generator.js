import { createFolder, isDirectory, itemExists, pascalToKebab, readFile, writeFile } from "./utils.js";

const common = (name, type) => {
    if(!["controller", "component"].includes(type)) {
        return false;
    }

    const isController = type === "controller";

    const folderName = isController ? "Controllers" : "Components";
    const basePath = `./src/${folderName}`;

    let destDir = `${basePath}`;
    destDir = isController ? destDir : `${destDir}/${name}`;

    if(!itemExists(destDir)) {
        createFolder(destDir);
    }

    return {
        sourceDir: `./.dumpsterfire-template/${type}`,
        destDir: destDir
    };
}

const generateController = (...args) => {
    const name = args[0];
    const data = common(name, "controller");

    if(!data) {
        return;
    }

    const { sourceDir, destDir } = data;

    const templateContent = readFile(`${sourceDir}/template.php`);
    const content = replaceContentName(templateContent, name);

    writeFile(`${destDir}/${name}.php`, content);
};

const generateComponent = (...args) => {
    const name = args[0];
    const data = common(name, "component");

    if(!data) {
        return;
    }

    const { sourceDir, destDir}  = data;

    const templates = {
        view: readFile(`${sourceDir}/view.php`),
        script: readFile(`${sourceDir}/script.ts`),
        model: readFile(`${sourceDir}/model.php`),
        style: readFile(`${sourceDir}/style.css`)
    }

    const htmlName = pascalToKebab(name);

    writeFile(
        `${destDir}/view.${name}.php`,
        replaceContentName(replaceContentName(templates.view, name), htmlName, true)
    );

    writeFile(
        `${destDir}/script.${name}.ts`,
        replaceContentName(templates.script, name)
    );

    writeFile(
        `${destDir}/${name}.php`,
        replaceContentName(templates.model, name)
    );

    writeFile(
        `${destDir}/style.${name}.css`,
        replaceContentName(templates.style, htmlName, true)
    );
}

const replaceContentName = (content, name, html = false) => {
    return html ? content.replaceAll("/*[{html-name}]*/", name) : content.replaceAll("/*[{name}]*/", name);
}

export const dumpsterfireGenerator = {
    component: generateComponent,
    controller: generateController
}