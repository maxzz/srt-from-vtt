import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import rimraf from 'rimraf';
import { fnames } from '../utils/utils-os';
import { removeIndent } from '../utils/utils-es6';
import { OsStuff } from '../utils/utils-os-stuff';
import { notes } from './app-notes';
import { newErrorArgs } from '../utils/utils-errors';
import { Targets } from './app-types';
import { convertVttToSrt } from '../utils/utils-vtt';

function handleVttFile(fname: string) {
    const isVtt = path.extname(fname).toLowerCase() === '.vtt';
    if (!isVtt) {
        return;
    }
    const cnt = fs.readFileSync(fname, { encoding: 'utf-8' });
    const newCnt = convertVttToSrt(cnt);

    const newName = path.join(path.dirname(fname), path.basename(fname, '.vtt') + '.srt');
    fs.writeFileSync(newName, newCnt);

    fs.unlinkSync(fname);
    
    console.log('newName', newName);
}

function handleFolder(targetFolder: string) {
    let lastFolder = path.basename(targetFolder) || targetFolder;

    // let final: MSPair[] = getMSPairs(targetFolder);

    // final.forEach(({ mp4, srt }) => oneFileAction(animationState, targetFolder, mp4, srt, final));

    // notes.addProcessed(`    ${final.length ? ` (${final.length})`.padStart(7, ' ') : 'skipped'}: ${lastFolder}`);
}

export function handleTargets(targets: Targets) {

    const { files, dirs } = targets;

    if (files.length) {
        for (let file of files) {
            handleVttFile(file);
        }
    } else if (dirs.length) {
        for (let dir of dirs) {
            handleFolder(dir);
        }
    } else {
        throw newErrorArgs(`Specify at leats one folder or files name to process`);
    }
}

//add global node-vtt-to-srt //https://www.npmjs.com/package/node-vtt-to-srt (vtt-to-srt will not work): 'node-vtt-to-srt lesson01.srt < lesson01.vtt'
