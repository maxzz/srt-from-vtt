import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import rimraf from 'rimraf';
import { fnames } from '../utils/utils-os';
import { removeIndent } from '../utils/utils-es6';
import { OsStuff } from '../utils/utils-os-stuff';
import { notes } from './app-notes';
import { newErrorArgs } from '../utils/utils-errors';

export function handleFiles(filesToRar: string[]): void {
    // TOOO: Check: all files and folders should be inside the same folder (although it isn't possible with drag&drop).
    throw newErrorArgs('Separate handling of filenames has not yet been implemented');
    
    // 0. Simulate rardir behaviour. Files should be in the same folder.
    /*
        let root = path.dirname(filesToRar[0]);
        let files = filesToRar.map(_ => path.basename(_));
        let fnameRar = path.join(root, 'tm.rar');

        if (exist(fnameRar)) { // If tm.rar exist then use shift+drag to move into rar.
            notes.add(`--- INFO: tm.rar already exist here:\n    b:${root}`);
            return;
        }

        // Create dirs.txt and add to tm.rar.

        appUtils.createFileMp4WithSrt(fnameRar, root, files);
    */
}

function handleFolder(targetFolder: string) {
    let lastFolder = path.basename(targetFolder) || targetFolder;

    // let final: MSPair[] = getMSPairs(targetFolder);

    // final.forEach(({ mp4, srt }) => oneFileAction(animationState, targetFolder, mp4, srt, final));

    // notes.addProcessed(`    ${final.length ? ` (${final.length})`.padStart(7, ' ') : 'skipped'}: ${lastFolder}`);
}

export function handleTargets(dirs: string[]) {
    for (let dir of dirs) {
        handleFolder(dir);
    }
}

//add global node-vtt-to-srt //https://www.npmjs.com/package/node-vtt-to-srt (vtt-to-srt will not work): 'node-vtt-to-srt lesson01.srt < lesson01.vtt'
