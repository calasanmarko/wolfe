import { cpSync, readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import path from "path";

export const writeTemplate = (templatePath: string, destinationPath: string, projectName: string) => {
    console.log("Copying files...");
    cpSync(path.resolve(__dirname, templatePath), projectName, { recursive: true });

    console.log("Processing files...");
    const files = getAllFiles(destinationPath, []);
    files.forEach(file => replaceInFile(file, projectName));

    console.log(`Template written to ${destinationPath}`);
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
};

const replaceInFile = (filePath: string, projectName: string) => {
    const content = readFileSync(filePath, 'utf8');
    const newContent = content.replace(/~~name~~/g, projectName);

    if (content !== newContent) {
        writeFileSync(filePath, newContent, 'utf8');
    }
};