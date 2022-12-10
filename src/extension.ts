import * as vscode from 'vscode';
import { ScriptWareInjector } from './lib/injector/ScriptWareInjector';
import { isMacOS, isScriptWareOpenWithDevTools } from './util';

const injector = new ScriptWareInjector();

export function activate(context: vscode.ExtensionContext) {
	if (!isMacOS()) {
		vscode.window.showErrorMessage('ScriptWare M is only supported on macOS.');
		return;
	}

	let injectAndOpenItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	injectAndOpenItem.command = 'scriptware-m-vscode.injectAndOpen';
	injectAndOpenItem.tooltip = 'Open Injected ScriptWareM (SWM)';
	injectAndOpenItem.text = '$(triangle-right) Open Injected ScriptWareM (SWM)';

	injectAndOpenItem.show();

	let runItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	runItem.command = 'scriptware-m-vscode.execute';
	runItem.tooltip = 'Execute Script (SWM)';
	runItem.text = '$(triangle-right) Execute Script (SWM)';

	runItem.show();

	let executeDisposable = vscode.commands.registerCommand('scriptware-m-vscode.execute', () => {
		injector.evaluate("alert('hello world!')");
	});

	let injectAndOpenDisposable = vscode.commands.registerCommand('scriptware-m-vscode.injectAndOpen', () => {
		if (isScriptWareOpenWithDevTools()) {
			console.log('already injected!');
		}

		injector.openAndInject();

		injector.events.on('injected', () => {
			console.log('injected');
		});
	});

	context.subscriptions.push(executeDisposable);
	context.subscriptions.push(injectAndOpenDisposable);

	const { document } = vscode.window.activeTextEditor ?? { document: null };
	if (document) {
		const { fileName } = document;
		if (fileName.endsWith('.lua')) {
			vscode.window.showInformationMessage('it is lua xd');
		}
	}
}

export function deactivate() {
	injector.client.close();
}
