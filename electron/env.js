const parseArgs = require('electron-args');
const { flags } = parseArgs();

process.env.SOURCE_PATH = flags.appPath;
