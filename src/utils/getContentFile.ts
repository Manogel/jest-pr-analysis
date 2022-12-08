import { warning, error, info } from '@actions/core';
import { existsSync, readFileSync } from 'fs';

export const getContentFile = (pathToFile: string) => {
  const fileExists = existsSync(pathToFile);

  if (!fileExists) {
    error(`File "${pathToFile}" doesn't exist`);
    throw new Error(`getContentFile::noFile`);
  }

  const content = readFileSync(pathToFile, 'utf8');

  if (content.length === 0) {
    warning(`No content found in file "${pathToFile}"`);
    throw new Error('getContentFile::noContent');
  }

  info(`File read successfully "${pathToFile}"`);
  return content;
};
