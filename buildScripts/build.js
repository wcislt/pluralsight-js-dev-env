/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack.config.prd';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generating bundle for production.  Please wait...'));

webpack(webpackConfig).run((err, stats) => {
  if (err) { // stop here if fatal error
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalk.red(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalk.yellow('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // If we get to this point, the build succeeded
  console.log(chalk.green('You app has been built for production and is available in /dist'));

  return 0;
});
