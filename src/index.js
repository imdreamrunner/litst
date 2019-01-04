import commander from 'commander';

import {version, description} from '../package.json'
import {serve} from './serve'

commander.version(version).description(description);

commander.command('serve [directory]').action(serve);

commander.parse(process.argv);

if (commander.args.length === 0) {
    commander.outputHelp();
}
