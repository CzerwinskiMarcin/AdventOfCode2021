"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const fs = require("fs");
class FileUtils {
    static readFileToArray(filePath, separator = '\n') {
        try {
            fs.accessSync(filePath);
        }
        catch (err) {
            throw new Error(`There is no file in filepath: ${filePath}`);
        }
        const fileContent = fs.readFileSync(filePath).toString('utf-8');
        return fileContent
            .split(separator)
            .map(str => str.replace(separator, '').trim())
            .filter(str => !!str);
    }
}
exports.FileUtils = FileUtils;
//# sourceMappingURL=file-utils.js.map