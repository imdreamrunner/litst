import commander from 'commander';

import {version, description} from '../package.json'
import {serve} from './serve'
import {publish} from './publish'

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
});

commander.version(version).description(description);

commander.command('serve [directory]').action(serve);

commander
    .command('publish [directory]')
    .option('-o, --output <directory>', 'Output directory')
    .action(publish);

commander.parse(process.argv);

if (commander.args.length === 0) {
    commander.outputHelp();
}
