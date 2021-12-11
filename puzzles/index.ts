import { prepareScriptStructure } from "../src";

const yargs = require('yargs');
const path = require('path');

type puzzleDataSource = 'example' | 'puzzle';

yargs.command({
    aliases: 'i',
    command: 'initialize',
    describe: 'Initialize folder structure for new day',
    builder: {
        day: {
            alias: 'd',
            describe: 'Day of the puzzle to initialize script structure',
            demandOption: true,
            type: 'number'
        }
    },
    handler({day}: { day: number }) {
        prepareScriptStructure(day);
    }
});

yargs.command({
    aliases: 'r',
    command: 'run',
    describe: 'Run puzzle',
    builder: {
        day: {
            alias: 'd',
            describe: 'Day of the puzzle to initialize script structure',
            demandOption: true,
            type: 'number'
        },
        source: {
            alias: 's',
            default: 'example',
            describe: 'Source of the data for the puzzle',
            choices: ['example', 'puzzle']
        }
    },
    handler({day, source}: { day: number, source: puzzleDataSource }) {
        runPuzzle(day, source);
    }
})

yargs.parse();


function runPuzzle(day: number, source: puzzleDataSource): void {
    const formattedDay = `${day}`.padStart(2, '0');
    const targetPath = path.join(__dirname, formattedDay);

    const startTime = Date.now();
    import(targetPath)
        .then(({default: fn}: { default: Function }) => {
            const result = fn(path.join(__dirname, formattedDay, 'data', `${source}.txt`));
            console.log(`Puzzle solution run time: ${Date.now() - startTime} ms`);
            console.log('Result: ', result);
        })
        .catch(err => {
            console.error(err);
        });

}

