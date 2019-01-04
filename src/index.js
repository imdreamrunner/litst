import commander from 'commander';

import { version, description } from '../package.json'

commander
    .version(version)
    .description(description)
    .option('-d', '--directory', 'Directory of the content.')
    .parse(process.argv);

if (commander.args.length === 0) {
    commander.outputHelp();
}
