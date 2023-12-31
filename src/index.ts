#!/usr/bin/env node

import { init } from './commands/init.js';
import { help } from './commands/help.js';

type Commands = 'init' | 'help';

const args = process.argv.slice(2);

if (args.length == 0) {
    help();
} else {
    switch (args[0] as Commands) {
        case 'init': init(args.slice(1)); break;
        default: help(); break;
    }
}