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
    testRegex: string;
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
    rootDir = null,
    coverageThreshold,
    testRegex,
  } = packageObj.jest;

  let formattedRootDir = rootDir;

  if (rootDir != null) {
    const lastChar = rootDir.substring(rootDir.length - 1);

    if (lastChar === '/') {
      formattedRootDir = rootDir.substring(0, rootDir.length - 1);
    }
  }

  return {
    collectCoverageFrom,
    rootDir: formattedRootDir,
    coverageThreshold: coverageThreshold.global,
    testRegex,
  };
};
