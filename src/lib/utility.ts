import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

// Moves up the directory tree until it finds the directory containing wolfe.json
export const findWolfeRoot = (cwd: string = process.cwd()): string => {
    console.log(cwd);
    const wolfeJsonPath = path.join(cwd, 'wolfe.json');
    if (existsSync(wolfeJsonPath)) {
        return cwd;
    }
    const parentDir = path.dirname(cwd);
    if (parentDir === cwd) {
        throw new Error('Could not find wolfe.json');
    }
    return findWolfeRoot(parentDir);
}

// Find the first line of a file that is equal to the given string
export const findLine = (filePath: string, line: string): number => {
    const lines = readFileSync(filePath, 'utf-8').split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] === line) {
            return i;
        }
    }
    throw new Error(`Could not find line ${line} in ${filePath}`);
}

export const prependFile = async (file: string, text: string) => {
    const data = readFileSync(file, 'utf-8');
    writeFileSync(file, text + data);
}