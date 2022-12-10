import { ScriptWareInjector } from '../injector/ScriptWareInjector';
import { ILogOptions } from './ILogOptions';

// A utility class that logs to the internal console of ScriptWare M
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
