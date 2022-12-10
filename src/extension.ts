import * as vscode from 'vscode';
import { ScriptWareInjector } from './lib/injector/ScriptWareInjector';
import { isMacOS } from './util';

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
	const injector = new ScriptWareInjector();

	if (!isMacOS()) {
		vscode.window.showErrorMessage('ScriptWare M is only supported on macOS.');
		return;
	}

	console.log('Congratulations, your extension "scriptware-m-vscode" is now active!');

	let disposable = vscode.commands.registerCommand('scriptware-m-vscode.helloWorld', () => {
		injector.openScriptWareM();
		injector.inject();
	});

	context.subscriptions.push(disposable);

	const { document } = vscode.window.activeTextEditor ?? { document: null };
	if (document) {
		const { fileName } = document;
		if (fileName.endsWith('.lua')) {
			vscode.window.showInformationMessage('it is lua xd');
		}
	}
}

export function deactivate() {}
