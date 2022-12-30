import { EOL } from 'os';

export function convertVttToSrt(fileContent: string): string {

    let ccCount = 0;
    const regFirstLine = new RegExp(`(WEBVTT\s*(FILE)?.*)(${EOL})*`, 'g');
    const reg2ItemsLine = /(\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2})\.(\d{3}\s*)/g;
    const reg3ItemsLine = /(\d{2}:\d{2}:\d{2})\.(\d{3}\s+)\-\-\>(\s+\d{2}:\d{2}:\d{2})\.(\d{3}\s*)/g;

    function convertTimestamp(item: string) {
        item = item.replace('.', ',');
        if (item.split(":").length < 3) {
            item = '00:' + item.trim();
        }
        return item;
    }

    function convertLine(line: string): string | undefined {

        if (!line.trim()) {
            return;
        }

        let vttLine = '';

        if (line.match(reg2ItemsLine)) {
            const vttComp = line.split('-->');
            vttLine = vttComp.map(convertTimestamp).join(' --> ');
            vttLine = vttLine + EOL;
        }
        else if (line.match(reg3ItemsLine)) {
            const vttComp = line.split('-->');
            vttLine = vttComp.map(convertTimestamp).join(' --> ');
            vttLine = EOL + vttLine + EOL;
        }
        else if (line.match(regFirstLine)) {
            vttLine = line.replace(regFirstLine, '');
        }
        else {
            vttLine = line + EOL;
        }

        if (!vttLine.trim()) {
            return;
        }

        if (/^Kind:|^Language:/m.test(vttLine)) {
            return;
        }

        if (/^[0-9]+:/m.test(vttLine)) {
            if (ccCount === 0) {
                vttLine = ++ccCount + EOL + vttLine;
            } else {
                vttLine = EOL + ++ccCount + EOL + vttLine;
            }
        }
        return vttLine;
    }

    const lines = fileContent.split(/\r?\n/);
    return lines.map(convertLine).filter((line) => line !== undefined).join('');
}
