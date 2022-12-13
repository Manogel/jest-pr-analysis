import { info } from '@actions/core';
import fs from 'fs-extra';

export const createCoverageTextFile = (filePath: string) => {
  info('Running createCoverageTextFile');
  if (fs.existsSync(filePath)) {
    info(`path ${filePath} exists`);
    return;
  }

  const paths = filePath.split('/').filter((pathItem) => pathItem !== '.');

  paths.pop(); // drop filename
  const formattedPath = paths.join('/');

  if (formattedPath) {
    fs.mkdirpSync(formattedPath);
  }

  fs.createFileSync(filePath);

  info(`Created file ${filePath}`);
};
