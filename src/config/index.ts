import dev from './dev';
import sandbox from './sandbox';
import production from './production';

const env = process.env.WEB_ENV || 'dev';

const config = {
  dev: dev,
  sandbox: sandbox,
  production: production,
};

export default config[env];
