import { ScriptWareInjector } from '../injector/ScriptWareInjector';
import { ILogOptions } from './ILogOptions';

export class ScriptWareConsole {
	private injector: ScriptWareInjector;

	public constructor(injector: ScriptWareInjector) {
		this.injector = injector;
	}

	public log(options: ILogOptions) {}
	public error(options: ILogOptions) {}
	public warn(options: ILogOptions) {}
	public info(options: ILogOptions) {}
}
