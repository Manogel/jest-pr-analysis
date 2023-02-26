import micromatch from 'micromatch';

import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import { getJestParams } from '~/utils/getJestParams';

const normalizeChangedFilesPath = (
  changedFilesArray: string[],
  jestRootDir: string | null,
) => {
  return changedFilesArray.map((from) => {
    // remove rootDir reference

    const formattedPath =
      jestRootDir != null ? from.split(`${jestRootDir}/`)[1] : from;
    return formattedPath;
  });
};

export const getPrChangedFiles = async (actionParams: IActionParams) => {
  const jestParams = getJestParams();
  const prevResults = {
    prChangedFiles: [] as string[],
    filesToTest: [] as string[],
  };

  const filesDiffList = await getPrDiffFiles(actionParams);
  const filenamesList = filesDiffList.map(({ filename }) => filename);

  // Filter files by collectCoverageFrom
  const changedFilesArray = micromatch(
    filenamesList,
    jestParams.collectCoverageFrom,
  );
  prevResults.prChangedFiles = normalizeChangedFilesPath(
    changedFilesArray,
    jestParams.rootDir,
  );

  if (changedFilesArray.length <= 0) {
    return prevResults;
  }

  // Get related test files (*.spec.ts, *.test.ts)
  const filesToTestArray = await getRelatedTestFiles(
    changedFilesArray,
    jestParams.testRegex,
  );
  prevResults.filesToTest = filesToTestArray;

  return prevResults;
};
