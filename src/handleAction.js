import { deleteFolder, itemExists, copyContent } from "./utils.js";
import { fileURLToPath } from "url";
import path from "path";
import rl from "readline";
import { createDumpsterfireApp, logEnding } from "./createDumpsterfireApp.js";

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query) =>
    new Promise((resolve) => readline.question(query, resolve));

const handleAction = async (action) => {
    switch (action) {
        case "--purge":
            await actionPurge();
            break;
        case "--blank":
            actionBlank();
    }
};

const actionPurge = async () => {
    const expectedRes = "yes.";

    if (!itemExists(".dumpsterfire-template")) {
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
        '[CREATE-DUMPSTERFIRE-APP] Are you sure you want to continue? Enter the following: "' +
            expectedRes +
            '" -> '
    );

    readline.close();

    if (res !== expectedRes) {
        console.log("[CREATE-DUMPSTERFIRE-APP] Exiting...");
    }

    actualPurge();
};

const actualPurge = () => {
    const foldersToDelete = ["./src/Components", "./src/Controllers"];

    const templatePath = "./.dumpsterfire-template";

    foldersToDelete.map((elem) => deleteFolder(elem));
    replaceFiles(templatePath);

    deleteFolder(templatePath);
};

const actionBlank = () => {
    createDumpsterfireApp();
    actualPurge();
    logEnding();
}

const replaceFiles = (templatePath) => {
    copyContent(templatePath, ".");
};

export { handleAction };
