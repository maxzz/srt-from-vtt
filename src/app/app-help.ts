import chalk from 'chalk';

//const cfg = require('../../package.json'); // avoid the whole file include
const PROGRAM_VERSION = "1.0.0";
const PROGRAM_NAME = 'srt-from-vtt';

export function help() {
    let help = `
${chalk.cyan(PROGRAM_NAME)} utility will convert .vtt subtitles files to .SRT format inside the specified folders..
Version ${PROGRAM_VERSION}
Usage: ${PROGRAM_NAME} <file(s).vtt> | <folder(s)>`;
    console.log(help);
}
