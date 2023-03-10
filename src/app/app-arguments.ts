import path from 'path';
import { exist } from '../utils/utils-os';
import { newErrorArgs } from '../utils/utils-errors';
import { Targets } from './app-types';
import { OsStuff } from '../utils/utils-os-stuff';

function checkArg(argTargets: string[]): Targets {
    let rv = {
        files: [],
        dirs: [],
    };

    for (let target of argTargets) {
        let current: string = path.resolve(target); // relative to the start up folder
        let st = exist(current);
        if (st) {
            if (st.isDirectory()) {
                rv.dirs.push(current);
            } else if (st.isFile()) {
                rv.files.push(current); // TODO: Check all files should have the same root folder. That is not possible with drag and drop, but still ...
            }
        } else {
            throw newErrorArgs(`Target "${target}" does not exist.`);
        }
    }

    return rv;
}

export function getTargets(): Targets {
    const args = require('minimist')(process.argv.slice(2), {
    });

    const targets: Targets = checkArg(args._ || []);

    const isSingleFolderToProcess = targets.dirs.length === 1 && !targets.files.length; // If we have a single top folder (and no top files w/ drag&drop) then check what folders we have inside.
    if (isSingleFolderToProcess) {
        const onlyDir = targets.dirs[0]; // one of cases with 'srt-from-vtt .'
        const rootFolders: OsStuff.FolderItem = OsStuff.collectDirItems(onlyDir);
        targets.dirs.push(...rootFolders.subs.map((_: OsStuff.FolderItem) => _.name));
    }

    //console.log(`targets ${JSON.stringify(targets, null, 4)}`);

    return targets;
}
