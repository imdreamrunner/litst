import commander from 'commander';

import { version } from '../package.json'

commander
    .version(version)
    .option('-d', '--directory', 'Directory of the content.')
    .parse(process.argv);
