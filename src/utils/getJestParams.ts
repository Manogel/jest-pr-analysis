import fs from 'fs-extra';

const PACKAGE_JSON_PATH = './package.json';

export interface IJestThreshold {
  branches: number;
  functions: number;
  lines: number;
  statements: number;
}

interface IPackageObj {
  jest: {
    collectCoverageFrom: string[];
    rootDir: string;
    coverageThreshold: {
      global: IJestThreshold;
    };
  };
}

export const getJestParams = () => {
  const packageObj = fs.readJsonSync(PACKAGE_JSON_PATH) as IPackageObj;
  const {
    collectCoverageFrom,
    rootDir = '.',
    coverageThreshold,
  } = packageObj.jest;

  const lastChar = rootDir.substring(rootDir.length - 1);
  let formattedRootDir = rootDir;

  if (lastChar === '/') {
    formattedRootDir = rootDir.substring(0, rootDir.length - 1);
  }

  return {
    collectCoverageFrom,
    rootDir: formattedRootDir,
    coverageThreshold: coverageThreshold.global,
  };
};
