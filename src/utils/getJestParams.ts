import fs from 'fs-extra';

const PACKAGE_JSON_PATH = './package.json';

interface IPackageObj {
  jest: {
    collectCoverageFrom: string[];
    rootDir: string;
  };
}

export const getJestParams = () => {
  const packageObj = fs.readJsonSync(PACKAGE_JSON_PATH) as IPackageObj;
  const { collectCoverageFrom, rootDir } = packageObj.jest;

  const lastChar = rootDir.substring(rootDir.length - 1);
  let formattedRootDir = rootDir;

  if (lastChar === '/') {
    formattedRootDir = rootDir.substring(0, rootDir.length - 1);
  }

  return {
    collectCoverageFrom,
    rootDir: formattedRootDir,
  };
};
