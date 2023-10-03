const { spawn } = require('child_process');

const serve = spawn('serve', ['-s', 'build']);

serve.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

serve.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

serve.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
