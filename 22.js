const { spawn } = require('child_process');

function startApp() {
  const app = spawn('node', ['2.js'], { stdio: 'inherit' });

  app.on('exit', (code) => {
    // 应用程序退出时重新启动
	console.log('重新启动');
    startApp();
  });
}

startApp();
