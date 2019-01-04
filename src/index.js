import commander from 'commander';

import { version } from '../package.json'

commander
    .version(version)
    .option('-d', '--directory', 'Directory of the content.')
    .parse(process.argv);

if (commander.args.length === 0) {
    commander.outputHelp();
}
