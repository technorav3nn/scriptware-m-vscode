import { ScriptWareInjector } from '../injector/ScriptWareInjector';

export function execute(injector: ScriptWareInjector, code: string) {
	injector.evaluate(code);
}
