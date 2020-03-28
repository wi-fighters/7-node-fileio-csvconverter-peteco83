const csv = require('csvtojson')
const path = require('path')
const fs = require('fs')
const args = process.argv.slice(2)

let [csvFilePath, toCsvFilePath] = process.argv.slice(2)

const converter = (fromfile, tofile) => {

    if (fromfile && tofile) {
        csv()
            .fromFile(path.resolve(__dirname, csvFilePath))
            .then((jsonObj) => {
                fs.writeFileSync(__dirname + `/${tofile}`, JSON.stringify(jsonObj))
                console.log(`JSON file saved at: ${tofile}`)
            
            })
            .catch(err => console.error(`Something went wrong, Could not write json to: ${tofile}`))
    } else if (fromfile && !tofile) {
        csv()   
        .fromFile(path.resolve(__dirname, csvFilePath))
        .then((jsonObj) => {
            fs.writeFileSync(__dirname + "/demo.json", JSON.stringify(jsonObj))
            console.log(`JSON file saved at: ${fromfile}.json`)
        })

    } else if (!fromfile && !tofile) {
        console.error("Please provide a csv file to convert to JSON")
        process.exit
    } 

}


converter(csvFilePath, toCsvFilePath)