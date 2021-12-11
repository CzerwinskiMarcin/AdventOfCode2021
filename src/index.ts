import * as fs from 'fs';
import * as path from 'path';
import * as structure from './structures/files-structure.json';

const templatesDir = path.join(process.mainModule.path, '..', 'src', 'templates');

export function prepareScriptStructure(day: number): void {
    const puzzleDayDirectorPath = path.join(process.mainModule.path, `${day}`);

    if (fs.existsSync(puzzleDayDirectorPath)) {
        throw new Error(`Puzzle from day ${day} already created`);
    }

    const structure = loadBasicStructures();
    createDir(puzzleDayDirectorPath);
    createStructure(structure, puzzleDayDirectorPath);
}

function createDir(path: string): void {
    fs.mkdirSync(path);
}

function createFile(path: string): void {
    fs.writeFileSync(path, '');
}

function copyFile(source: string, target: string): void {
    fs.copyFileSync(source, target);
}

function loadBasicStructures(parentFile: string = null): any {
    return structure
        .filter(struct => struct.parent === parentFile)
        .map( struct => {
            // @ts-ignore
            struct.children = loadBasicStructures(struct.name);
            return struct;
        })
}

function createStructure(structures: Array<any>, parentPath: string): void {
    structures
        .map(structure => {
            const selfPath = path.join(parentPath, structure.name);

            if (structure.type === "dir" && structure.name) {
                createDir(selfPath);
            } else if (structure.type === 'file' && structure.template && structure.name) {
                copyFile(path.join(templatesDir, structure.template), selfPath);
            } else if (structure.type === 'file') {
                createFile(selfPath);
            }

            if (structure.children?.length) {
                createStructure(structure.children, selfPath);
            }
        });
}


