const { spawn } = require('child_process');
function startApp() {
	const argv = process.argv.slice(2);
	const params = {};
	let currentParam = null;
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '-h') {
			process.exit(); 
		}
		if (argv[i].startsWith('-')) {
			const paramName = argv[i].substring(1);
			params[paramName] = argv[i + 1];
			currentParam = paramName;
			i++;
			} else if (currentParam) {
			params[currentParam] = argv[i];
			currentParam = null;
		}
	}
	const app = spawn('node', ['2.js', ...generateArgs(params)], { stdio: 'inherit' });
	app.on('exit', (code) => {
		console.log('重新启动');
		startApp();
	});
}
function generateArgs(params) {
	const args = [];
	for (const param in params) {
		args.push(`-${param}`);
		args.push(params[param]);
	}
	return args;
}
startApp();
