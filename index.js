#!/usr/bin/env node

'use strict'

console.log(' J npx script tets J');

// const fs = require('fs');
// const path = require('path');
// const prompt = require('prompt-sync')();
//
// const {
//     getPathFromObject,
//     getSourceFilePath,
//     compareAndWriteFiles,
//     clearJSON,
//     logger
// } = require('./utils');
//
// const translations = {};
//
// let allTranslationFiles = [];
//
// const dirPath = prompt('Enter i18n directory! ');
//
// try {
//     const isDirectory = fs.lstatSync(dirPath).isDirectory();
//
//     if (!isDirectory) {
//         logger.error(`${dirPath} is not a directory.`)
//         process.exit(0);
//     }
// } catch (e) {
//     logger.error(`${dirPath} is not a directory.`)
//     process.exit(0);
// }
//
//
// try {
//     fs.readdirSync(dirPath, {
//         withFileTypes: true
//     }).forEach(locale => {
//         if (locale.isDirectory() && !locale.name.startsWith('.')) {
//
//             const filePath = getPathFromObject(locale);
//
//             const fileNames = fs.readdirSync(filePath, { withFileTypes: true });
//
//             const localeFiles = [];
//             for (const fileName of fileNames) {
//                 if (fileName.isFile() && fileName.name.endsWith('.json')) {
//                     allTranslationFiles.push(fileName.name);
//                     localeFiles.push(fileName.name);
//                 }
//             }
//             translations[locale.name] = localeFiles;
//         }
//     });
//     allTranslationFiles = [... new Set(allTranslationFiles)];
//
//     for (const locale in translations) {
//         const localeTranslations = translations[locale];
//         const filesToAdd = allTranslationFiles.filter(fileName => !localeTranslations.includes(fileName));
//         for (const fileName of filesToAdd) {
//             const sourceFilePath = getSourceFilePath(locale, fileName);
//             const targetFilePath = `${dirPath}${path.sep}${locale}${path.sep}${fileName}`;
//
//             fs.copyFileSync(sourceFilePath, targetFilePath);
//
//             const file = require(targetFilePath);
//             const newFileObject = JSON.parse(JSON.stringify(clearJSON(file)));
//
//             fs.writeFileSync(targetFilePath, JSON.stringify(newFileObject, null, 2));
//         }
//     }
//
//     // eniig hadgalsnaa unshdag bish function bicheed shineer avdag bolgoh.
//     for (const fileName of allTranslationFiles) {
//         const filePaths = [];
//         for (const locale in translations) {
//             const p = `${dirPath}${path.sep}${locale}${path.sep}${fileName}`;
//             filePaths.push(p);
//         }
//
//         compareAndWriteFiles(filePaths);
//     }
// } catch (e) {
//     console.log('Error>>', e.message);
//     logger.error('Error');
//     process.exit(1);
// }
//
// logger.success('Success');
// process.exit(0);