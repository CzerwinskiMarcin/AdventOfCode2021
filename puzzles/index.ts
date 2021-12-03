const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const path = require('path');

const argv = yargs(hideBin(process.argv))
    .option('d', {
        alias: 'day',
        demandOption: true,
        describe: 'The puzzle from the day',
        type: 'number'
    })
    .option('s', {
        alias: 'source',
        default: 'example',
        describe: 'Source of the data for the puzzle',
        choices: ['example', 'puzzle']
    })
    .argv;


const {day, source} = argv;
const formattedDay = `${day}`.padStart(2, '0');
const targetPath = path.join(__dirname, formattedDay);

import(targetPath)
    .then(({default: fn}: {default: Function}) => {
        fn(path.join(__dirname, formattedDay, 'data', `${source}.txt`));
    })
    .catch(err => {
        console.error(err);
    });
