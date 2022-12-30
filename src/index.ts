import path from 'path';
import chalk from 'chalk';
import { exitProcess } from './utils/utils-errors';
import { Targets } from './app/app-types';
import { getTargets } from './app/app-arguments';
import { help } from './app/app-help';
import { notes } from './app/app-notes';
import { handleTargets } from './app/app';

async function main() {
    const targets: Targets = getTargets();
    handleTargets(targets);

    if (notes.willShow()) {
        if (targets.dirs.length) {
            const rootDir = path.dirname(targets.dirs[0]);
            console.log(chalk.blueBright(`Processed root:\n${rootDir}`));
        }
        //TODO: else [...targets.files, ...targets.dirs]
    }

    await notes.show(false);
}

main().catch(async (error) => {
    error.args && help(); // Show help only if arguments are invalid.

    const errorMsg = `${notes.buildMessage()}${chalk[error.args ? 'yellow' : 'red'](`\n${error.message}`)}`;
    await exitProcess(1, errorMsg);
});
