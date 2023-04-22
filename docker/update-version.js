#!/bin/node

const packageJson = require('../package.json');

const date = new Date();

packageJson.version = `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;

const fs = require('fs');

fs.writeFileSync(
  'package.json',
  JSON.stringify(packageJson, null, '  ') + '\n',
  { encoding: 'utf8', flag: 'w+' }
);
