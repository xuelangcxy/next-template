let instances = 1;
if (process.env.API_ENV === 'production') {
  instances = 2;
}

module.exports = {
  apps: [
    {
      name: 'test-dev',
      script: 'start.js',
      log_date_format: 'YYYY-MM-DD HH:mm',
      max_memory_restart: '1G',
      watch: [
        'routes',
        'api/server',
        'server.js',
        'proxy',
        'utils/config.js',
        'server',
      ],
      node_args: '--inspect --inspect-port=9226',
      env: {
        API_ENV: 'dev',
        PORT: 8880,
      },
    },
    {
      name: 'test',
      script: 'start.js',
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 25000,
      kill_timeout: 6000,
      instances,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      max_memory_restart: '1536M',
      env: {
        parallel: 2,
        NODE_ENV: 'production',
        API_ENV: 'production',
        PORT: 4449,
      },
    }
  ]
}