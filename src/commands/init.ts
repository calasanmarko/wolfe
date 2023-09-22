import { spawnSync } from "child_process";
import { cpSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const init = async (args: string[]) => {
    if (args.length == 0) {
        console.log("Please provide a project name");
        return;
    }

    const projectName = args[0];

    // rmSync(projectName, { recursive: true });

    console.log(`Creating project ${projectName}...`);
    mkdirSync(projectName);

    console.log("Copying files...");
    cpSync(path.resolve(__dirname, "../../templates/init"), projectName, { recursive: true });

    console.log("Processing files...");
    const files = getAllFiles(projectName, []);
    files.forEach(file => replaceInFile(file, projectName));

    console.log("Installing dependencies...");
    spawnSync(`npm install --prefix ./${projectName} @asteasolutions/zod-to-openapi drizzle-orm drizzle-zod express express-jsdoc-swagger openapi-merge pg swagger-ui-express zod`, { stdio: 'inherit', shell: true });
    spawnSync(`npm install --prefix ./${projectName} --save-dev @types/express @types/node @types/swagger-ui-express @types/pg`, { stdio: 'inherit', shell: true });

    console.log("Done!");
};

const getAllFiles = (dirPath: string, result: string[]) => {
    const files = readdirSync(dirPath);
  
    files.forEach(file => {
        if (statSync(path.join(dirPath, file)).isDirectory()) {
            result = getAllFiles(path.join(dirPath, file), result);
        } else {
            result.push(path.join(dirPath, file));
        }
    });
  
    return result;
}

const replaceInFile = (filePath: string, projectName: string) => {
    const content = readFileSync(filePath, 'utf8');
    const newContent = content.replace(/~~name~~/g, projectName);

    if (content !== newContent) {
        writeFileSync(filePath, newContent, 'utf8');
    }
}