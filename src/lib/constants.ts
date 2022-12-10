// disable naming convention rule for constants
// who tf uses UPPER_SNAKE_CASE for constants anyway
// thats so 2010 lol get with the times bro its 2021

/* eslint-disable @typescript-eslint/naming-convention */

export const ScriptWareMPath = '/Applications/Script-Ware.app/Contents/MacOS/Script-Ware';
export const RemoteDebuggingPort = 19872;
export const FullCommand = `pw="$(osascript -e 'Tell application "System Events" to display dialog "Password:" default answer "" with hidden answer' -e 'text returned of result' 2>/dev/null)" && /
echo "$pw" | sudo -S ${ScriptWareMPath} --remote-debugging-port=${RemoteDebuggingPort}`;

// const newCmd = `pw="$(osascript -e 'Tell application "System Events" to display dialog "Password:" default answer "" with hidden answer' -e 'text returned of result' 2>/dev/null)" && /
//		echo "$pw" | sudo -S "/Applications/Script-Ware.app/Contents/MacOS/Script-Ware" --remote-debugging-port=12321`;
