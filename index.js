const fs = require('fs');
const { promisify } = require('util');
const csv = require('csvtojson');
const path = require('path');

const writeFile = promisify(fs.writeFile);
let [ filePath, targetPath ] = process.argv.slice(2);

if(!filePath) {
    console.error("Please provide a csv file to convet to JSON");
    process.exit();
}

if(!targetPath) {
    const {dir, name : fileName} = path.parse(filePath);
    targetPath = path.join(dir, `${fileName}.json`);
}

csv().fromFile(filePath)
    .then(jsonData => writeFile(targetPath, JSON.stringify(jsonData, null, 2)))
    .then(() => console.log(`JSON file saved at: ${targetPath}`))
    .catch(err => console.error(`Something went wrong, Could not write json to: ${targetPath}`));


