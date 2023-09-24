import { readFileSync, writeFileSync } from "fs";
import { appendFile } from "fs/promises";
import { prependFile } from "./utility.js";

export const linkGroupRouter = (parentRouterFile: string, groupName: string) => {
    const routerName = `${groupName}Router`;
    
    const routeImport = `import { router as ${routerName} } from "./${groupName}/router.js";`;
    prependFile(parentRouterFile, routeImport + '\n');

    const route = `router.use("/${groupName}", ${routerName});`;
    appendFile(parentRouterFile, route + '\n');
};