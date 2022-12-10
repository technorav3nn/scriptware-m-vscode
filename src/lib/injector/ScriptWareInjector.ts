import { exec, execSync } from 'node:child_process';
import { TypedEmitter } from 'tiny-typed-emitter';
import { FullCommand, RemoteDebuggingPort, ScriptWareMPath } from '../constants';
import { WebSocket } from 'ws';
import fetch from 'node-fetch';
import { IInjectorEvents } from './IInjectorEvents';

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
	public events: TypedEmitter<IInjectorEvents>;
	public client!: WebSocket;

	private injected: boolean = false;

	public constructor() {
		this.events = new TypedEmitter();
	}

	/**
	 * Gets the websocket url from devtools page
	 * @private
	 * @returns Promise<string>
	 */
	private async getWebSocketUrl() {
		try {
			const response = await fetch(`http://localhost:${RemoteDebuggingPort}/json`);
			const json = (await response.json()) as { webSocketDebuggerUrl: string }[];

			const url = json[0].webSocketDebuggerUrl;

			console.log(json, url);

			return url;
		} catch (err) {
			throw err;
		}
	}

	/**
	 * Evaluates code in swm devtools
	 * @param {string} code - The javascript code to evaluate
	 * @returns {Promise<void>}
	 */
	public async devToolsEvaluate(code: string): Promise<void> {
		// check if the websocket is open
		if (this.client && this.client.readyState === WebSocket.OPEN) {
			return this.client.send(
				JSON.stringify({
					id: 1337,
					method: 'Runtime.evaluate',
					params: {
						expression: code,
					},
				}),
			);
		}

		const url = await this.getWebSocketUrl();
		if (!url) {
			throw new Error('Could not get websocket url');
		}
		this.client = new WebSocket(url as unknown as string);

		this.client.on('open', () => {
			this.client.send(
				JSON.stringify({
					id: 1337,
					method: 'Runtime.evaluate',
					params: {
						expression: code,
					},
				}),
			);
		});

		this.client.on('message', (data) => {
			const json = JSON.parse(data.toString());

			console.log('message: ', json);
		});

		this.client.on('error', console.error);
	}

	/**
	 * Opens ScriptWare M in devtools mode
	 * @returns {Promise<void>}
	 */
	public async openAndInject(): Promise<void> {
		exec(FullCommand, (error) => {
			if (error) {
				console.error(error);
			}
			this.events.emit('injected');
		});

		// exec(`"/Applications/Script-Ware.app/Contents/MacOS/Script-Ware" --args "r
		// emote-debugging-port=12321"`);
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
		return this.devToolsEvaluate(`
			${code}
		`);
	}
}
