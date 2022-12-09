import { exec } from 'node:child_process';
import { EventEmitter } from 'node:stream';

/**
 * SAVE THIS:
 * ./Script-Ware --remote-debugging-port="1321"
 */

// This is the class that will be used to inject into ScriptWare and evaluate scripts
// in devtools, read errors, and other functionality.
export class ScriptWareInjector {
	public events: EventEmitter;

	public constructor() {
		this.events = new EventEmitter();
	}

	public inject() {}
	public evaluate() {}
}
