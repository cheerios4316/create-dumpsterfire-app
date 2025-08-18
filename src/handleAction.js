import { deleteFolder, itemExists, copyContent } from "./utils.js";
import { fileURLToPath } from "url";
import path from "path";
import rl from "readline";
import { createDumpsterfireApp, logEnding } from "./createDumpsterfireApp.js";
import { dumpsterfireGenerator } from "./generator.js";

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) =>
    new Promise((resolve) => readline.question(query, resolve));

const handleAction = async (action, ...args) => {
    switch (action) {
        case "--purge":
            await actionPurge();
            break;
        case "--blank":
            actionBlank();
            break;
        case "--component":
            actionComponent(...args);
            break;
        case "--controller":
            actionController(...args);
            break;
    }
};

const actionPurge = async () => {
    const expectedRes = "yes.";

    if (!itemExists(".dumpsterfire-blank-template")) {
        console.log(
            "[CREATE-DUMPSTERFIRE-APP] This project's example was already purged. Exiting..."
        );
        return;
    }

    console.log(
        "[CREATE-DUMPSTERFIRE-APP] This action will delete the following folders and their content:"
    );
    console.log("\t\t\t./src/Components ./src/Controllers");
    console.log(
        "[CREATE-DUMPSTERFIRE-APP] The following files will also be impacted:"
    );
    console.log("\t\t\t./index.php ./tailwind/init.css");
    const res = await question(
        "[CREATE-DUMPSTERFIRE-APP] Are you sure you want to continue? Enter the following: \"" +
        expectedRes +
        "\" -> "
    );

    readline.close();

    if (res !== expectedRes) {
        console.log("[CREATE-DUMPSTERFIRE-APP] Exiting...");
    }

    actualPurge();
};

const actualPurge = () => {
    const foldersToDelete = ["./src/Components", "./src/Controllers"];

    const templatePath = "./.dumpsterfire-blank-template";

    foldersToDelete.map((elem) => deleteFolder(elem));
    replaceFiles(templatePath);

    deleteFolder(templatePath);
};

const actionBlank = () => {
    createDumpsterfireApp();
    actualPurge();
    logEnding();
};

const replaceFiles = (templatePath) => {
    copyContent(templatePath, ".");
};

const actionComponent = (...args) => {
    try {
        console.log("[CREATE-DUMPSTERFIRE-APP] Starting creation of component...")
        dumpsterfireGenerator.component(...args);
        console.log("[CREATE-DUMPSTERFIRE-APP] Created component " + args[0]);
    } catch (e) {
        console.log("[CREATE-DUMPSTERFIRE-APP] Creation of component failed.");
        throw e;
    }
};

const actionController = (...args) => {
    try {
        console.log("[CREATE-DUMPSTERFIRE-APP] Starting creation of controller...")
        dumpsterfireGenerator.controller(...args);
        console.log("[CREATE-DUMPSTERFIRE-APP] Created controller " + args[0]);
    } catch (e) {
        console.log("[CREATE-DUMPSTERFIRE-APP] Creation of controller failed.");
        throw e;
    }
};

export { handleAction };
