import fs from 'fs-extra';
import path from 'path';

export const getThreshold = (
  packageJson: IPackageObj,
  defaultGlobalThreshold = 50,
) => {
  const DEFAULT_GLOBAL_THRESHOLD = {
    lines: defaultGlobalThreshold,
  };
  const globalThreshold = packageJson.jest.coverageThreshold?.global;

  return Object.assign(DEFAULT_GLOBAL_THRESHOLD, globalThreshold ?? {});
};

export const getJestParams = () => {
  const packageObj = fs.readJsonSync(path.join('package.json')) as IPackageObj;
  const { collectCoverageFrom, rootDir = null, testRegex } = packageObj.jest;

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
    coverageThreshold: getThreshold(packageObj),
    testRegex,
  };
};
