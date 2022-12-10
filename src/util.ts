import { exec } from 'child_process';
import * as os from 'node:os';
import { RemoteDebuggingPort, ScriptWareMPath } from './lib/constants';

export function isMacOS() {
	return process.platform === 'darwin';
}

export function isScriptWareOpenWithDevTools() {
	const command = `ps -A | grep ${ScriptWareMPath}`;
	let isOpen = false;

	exec(command, (error, stdout, stderr) => {
		const found = stdout.includes(ScriptWareMPath) && stdout.includes(RemoteDebuggingPort.toString());
		console.log(found, stdout);
		isOpen = found;
	});

	return isOpen;
}
