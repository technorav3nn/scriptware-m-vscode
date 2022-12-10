import { exec } from 'child_process';
import * as os from 'node:os';

export function isMacOS() {
	return process.platform === 'darwin';
}

export function openTerminal(cmd: string) {
	if (os.platform() !== 'darwin') {
		throw new Error('Not supported');
	}

	const command = [
		`osascript -e 'tell application "Terminal" to activate'`,
		`-e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`,
		`-e 'tell application "Terminal" to do script "open -a '/Applications/Script-Ware.app/Contents/MacOS/Script-Ware' --args 'remote-debugging-port=19872'
		" in selected tab of the front window'`,
	].join(' ');

	const child = exec(command, (error, stdout, stderr) => {
		if (error) {
			console.error(error);
		}
	});

	child.on('exit', (code) => console.log('Open terminal exit'));
}
