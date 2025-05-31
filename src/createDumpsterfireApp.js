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
    handleUnwantedFile,
} from "./utils.js";

const createDumpsterfireApp = () => {
    console.log("[CREATE-DUMPSTERFIRE-APP\] Setting up...");

    const repoUrl = "https://github.com/cheerios4316/poteriforti.git";

    const cloneDir = "temp-clone";

    let gitPackageJson = {};
    let currentPackageJson = undefined;

    const unwantedFiles = ["package.json", "README.md"];
    const unwantedFolders = [".git"];

    if (itemExists(cloneDir)) {
        deleteFolder(cloneDir);
        console.log("[CREATE-DUMPSTERFIRE-APP\] Deleted old cloned folder");
    }

    if (itemExists("package.json")) {
        currentPackageJson = { ...JSON.parse(readFile("package.json")) };
        console.log(
            "[CREATE-DUMPSTERFIRE-APP\] Backed up old package.json file"
        );
    }

    console.log(
        "[CREATE-DUMPSTERFIRE-APP\] Cloning Dumpsterfire repository..."
    );
    cloneRepo(repoUrl, cloneDir);
    console.log("[CREATE-DUMPSTERFIRE-APP\] Repository successfully cloned");

    const files = getFolderFiles(cloneDir);

    console.log("[CREATE-DUMPSTERFIRE-APP\] Copying files...");
    for (const file of files) {
        if (isDirectory(getPath(cloneDir, file))) {
            if (unwantedFolders.includes(file)) {
                continue;
            }
        } else {
            if (unwantedFiles.includes(file)) {
                const update = handleUnwantedFile(file, cloneDir);

                deleteFile(getPath(cloneDir, file));

                if (update?.fieldToUpdate) {
                    switch (update.fieldToUpdate) {
                        case "gitPackageJson":
                            gitPackageJson = update.data;
                    }
                }
                continue;
            }
        }
        moveHere(cloneDir, file);
    }
    console.log("[CREATE-DUMPSTERFIRE-APP\] Files successfully copied");

    let resultJson = {};

    console.log("[CREATE-DUMPSTERFIRE-APP\] Building new package.json file...");

    if (currentPackageJson) {
        writeFile("package.json.old", JSON.stringify(currentPackageJson));
        console.log(
            "[CREATE-DUMPSTERFIRE-APP\] Saved old package.json in package.json.old"
        );

        resultJson = {
            ...currentPackageJson,
            scripts: {
                ...(currentPackageJson.scripts
                    ? currentPackageJson.scripts
                    : {}),
                ...gitPackageJson.scripts,
            },
            dependencies: {
                ...(currentPackageJson.dependencies
                    ? currentPackageJson.dependencies
                    : {}),
                ...gitPackageJson.dependencies,
            },
            devDependencies: {
                ...(currentPackageJson.devDependencies
                    ? currentPackageJson.devDependencies
                    : {}),
                ...gitPackageJson.devDependencies,
            },
        };
    } else {
        resultJson = {
            ...gitPackageJson,
            name: "Your Dumpsterfire App",
            author: "<your name>",
        };
    }

    writeFile("package.json", JSON.stringify(resultJson));

    console.log(
        "[CREATE-DUMPSTERFIRE-APP\] New package.json successfully built."
    );

    writeFile(".env", "");

    process.on("exit", () => {
        console.log("[CREATE-DUMPSTERFIRE-APP\] Deleting cloned folder...");
        try {
            deleteFolder(cloneDir);
            console.log("[CREATE-DUMPSTERFIRE-APP\] Cloned folder deleted!");
        } catch (e) {
            console.log(
                "[CREATE-DUMPSTERFIRE-APP\] Failed deleting temp-clone! Please delete manually."
            );
        } finally {
            logEnding();
        }
    });

    const logEnding = () => {
        console.log("-------- FINISHED CREATING PROJECT FILES -------");
        console.log("------------------------------------------------");
        console.log("--- Do as follows to build your new project: ---");
        console.log("1.\tdocker-compose up --build -d");
        console.log(
            "2.\tGet into the Docker shell (docker exec -it <image name> sh"
        );
        console.log("3.\tRun 'npm run project:setup'");
        console.log(
            "4.\tIf Tailwind build fails, run 'npm install tailwindcss', then\n\trun 'npm run build:all'."
        );
        console.log("5.\tReach site at localhost:8080");
        console.log("------------------------------------------------");
    };
};

export { createDumpsterfireApp };
