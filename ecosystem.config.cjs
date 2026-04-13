const NODE = '/home/administrator/.nvm/versions/node/v22.22.2/bin/node';

module.exports = {
  apps: [
    {
      name: 'dept-web-ai-frontend',
      cwd: './frontend',
      script: NODE,
      args: 'node_modules/.bin/vite preview --port 5000 --host',
      interpreter: 'none',
      watch: false,
      env: { NODE_ENV: 'development' },
    },
    {
      name: 'dept-web-ai-backend',
      cwd: './backend',
      script: NODE,
      args: '--env-file=.env src/index.js',
      interpreter: 'none',
      watch: false,
      env: { NODE_ENV: 'production' },
    },
  ],
};
