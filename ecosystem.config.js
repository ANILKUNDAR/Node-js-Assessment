module.exports = {
  apps: [{
    name: 'API',
    script: 'index.js',
    args: 'one two',
    instances: 4,
    autorestart: true,
    watch: true,
    max_memory_restart: '700M', // restart server when 70 percent usage

  }]
};