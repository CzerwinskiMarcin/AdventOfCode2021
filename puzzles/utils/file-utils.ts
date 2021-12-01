import * as fs from 'fs';

export class FileUtils {
    static readFileToArray(filePath: string, separator: string = '\n'): Array<string> {
        try {
            fs.accessSync(filePath)
        } catch (err) {
            throw new Error(`There is no file in filepath: ${filePath}`);
        }

        const fileContent: string = fs.readFileSync(filePath).toString('utf-8');
        return fileContent
            .split(separator)
            .map(str => str.replace(separator, '').trim())
            .filter(str => !!str);
    }
}
