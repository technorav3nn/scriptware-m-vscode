import * as vscode from 'vscode';

// This method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "scriptware-m-vscode" is now active!');

	let disposable = vscode.commands.registerCommand('scriptware-m-vscode.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from scriptware-m-vscode!');
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
