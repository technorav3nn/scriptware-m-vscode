import { exec as execOld, execSync, spawn as spawnOld } from 'node:child_process';
import path = require('node:path');
import { promisify } from 'node:util';
import { TypedEmitter } from 'tiny-typed-emitter';
import { FullCommand, RemoteDebuggingPort, ScriptWareMPath } from '../constants';
import { exec as prompt } from 'sudo-prompt';

const exec = promisify(execOld);

/**
 * SAVE THIS:
 * ./Script-Ware --remote-debugging-port="1321"
 * THIS IS THE COMMAND TO RUN SWM IN DEVTOOLS MODE,
 * THIS IS REQUIRED FOR THE INJECTOR TO WORK
 */

// This is the class that will be used to inject into ScriptWare M and evaluate scripts
// in devtools, read errors, and other functionality.
export class ScriptWareInjector {
	/**
	 * The event emitter for the injector
	 */
	public events: TypedEmitter;

	private injected: boolean = false;

	public constructor() {
		this.events = new TypedEmitter();
	}

	/**
	 * Evaluates code in swm devtools
	 * @private
	 * @param {string} code - The javascript code to evaluate
	 * @returns {Promise<void>}
	 */
	private devToolsEvaluate(code: string): Promise<void> {
		return Promise.resolve();
	}

	/**
	 * Opens ScriptWare M in devtools mode
	 * @returns {Promise<void>}
	 */
	public async openScriptWareM(): Promise<void> {
		execOld(FullCommand, (error, stdout, stderr) => {
			if (error) {
				console.error(error);
			}
		});

		// exec(`"/Applications/Script-Ware.app/Contents/MacOS/Script-Ware" --args "r
		// emote-debugging-port=12321"`);
	}

	/**
	 * Injects the injector into swm devtools
	 * @returns {void}
	 */
	public inject(): void {
		return;
	}

	/**
	 * Evaluates Lua code in swm
	 * @param {string} code - The Lua code to evaluate
	 * @returns {void}
	 * @example
	 * injector.evaluate('print("Hello World!")'); // prints "Hello World!" to the F9 console
	 *
	 * Note: This does not return the output of the code, it only prints it to the console.
	 * To get errors, you must listen to the "error" event.
	 */
	public evaluate(code: string) {
		if (!this.injected) {
			console.log('SWM Must be injected!');
			return;
		}

		return this.devToolsEvaluate(`
			runScript(\`${code}\`);
		`);
	}
}
