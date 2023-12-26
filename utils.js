const fs = require('fs');
const path = require('path');
const clearJSON = (value) => {
    if (typeof value === 'object') {
        const object = {};
        for (const key in value) {
            object[key] = clearJSON(value[key]);
        }
        return object;
    }
    return '';
}

const compareAndWriteFiles = (paths) => {
    for (const [ index, fp ] of paths.entries()) {
        let result = require(fp);
        const filesToCompare = JSON.parse(JSON.stringify(paths.filter((p, i) => i !== index)));
        for (const filePathToCompare of filesToCompare) {
            const fileToCompare = require(filePathToCompare);
            result = replaceMissingKeys(result, fileToCompare);
        }

        const q = JSON.stringify(result, null, 2);
        // const formatted = JSON.stringify(q, null, 2).replaceAll('"",', '"", // Add Translation').replaceAll('""\n', '"" // Add Translation\n');
        fs.writeFileSync(fp, q);
    }
}

const getPathFromObject = (object) => {
    return object.path + path.sep + object.name;
}

const getSourceFilePath = (exclude, fileName) => {
    const locales = Object.keys(translations).filter(key => key !== exclude);
    for (const locale of locales) {
        if (translations[locale].includes(fileName)) {
            return `${dirPath}${path.sep}${locale}${path.sep}${fileName}`;
        }
    }
    return null;
};

const logger = {
    success(...message) {
        console.log('\x1b[32m%s\x1b[0m', message.filter(string => typeof string === 'string').join(''));  // success
    },
    error(...message) {
        console.log('\x1b[31m%s\x1b[0m', message.filter(string => typeof string === 'string').join(''));  // error
    },
    warning(...message) {
        console.log('\x1b[33m%s\x1b[0m', message.filter(string => typeof string === 'string').join(''));  // warning
    },
    info(...message) {
        console.log('\x1b[36m%s\x1b[0m', message.filter(string => typeof string === 'string').join(''));  // info
    },
}

const replaceMissingKeys = (a, b) => {
    const newObject = JSON.parse(JSON.stringify(a));
    if (typeof b === 'object') {
        for (const key in b) {
            if (!newObject.hasOwnProperty(key)) {
                // TODO: clearJSON here maybe
                newObject[key] = JSON.parse(JSON.stringify(b[key]));
            } else {
                if (typeof b[key] === 'object') {
                    newObject[key] = replaceMissingKeys(newObject[key], b[key]);
                }
            }
        }
    }
    return newObject;
};

module.exports = {
    clearJSON,
    compareAndWriteFiles,
    logger,
    getSourceFilePath,
    getPathFromObject,
    replaceMissingKeys
}