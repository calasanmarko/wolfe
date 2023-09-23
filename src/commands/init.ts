import { spawnSync } from "child_process";
import { cpSync, mkdirSync, readFileSync, readdirSync, rmdirSync, statSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { writeTemplate } from "../lib/templates.js";
import { installPackages } from "../lib/packages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const init = async (args: string[]) => {
    if (args.length == 0) {
        console.log("Please provide a project name");
        return;
    }

    const projectName = args[0];

    if (statSync(projectName).isDirectory()) {
        console.log(`Deleting existing folder ${projectName}`);
        rmdirSync(projectName, { recursive: true });
        return;
    }

    console.log(`Creating project ${projectName}...`);
    mkdirSync(projectName);

    console.log("Writing template...");
    writeTemplate("../../templates/init", projectName, projectName);

    console.log("Installing dependencies...");
    installPackages([
        '@asteasolutions/zod-to-openapi',
        'drizzle-orm',
        'drizzle-zod',
        'express',
        'express-jsdoc-swagger',
        'openapi-merge',
        'pg',
        'swagger-ui-express',
        'zod'
    ], false, `./${projectName}`);

    installPackages([
        '@types/express',
        '@types/node',
        '@types/swagger-ui-express',
        '@types/pg'
    ], true, `./${projectName}`);
    
    console.log("Done!");
};