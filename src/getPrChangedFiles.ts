import micromatch from 'micromatch';

import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import { IPrModifiedLines } from '~/stages/types';
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
    modifiedLines: {} as IPrModifiedLines,
  };

  const filesDiffList = await getPrDiffFiles(actionParams);

  const modifiedLines: {
    [filePath: string]: number[];
  } = {};

  for (const file of filesDiffList) {
    if (!file.to) continue;
    modifiedLines[file.to] = [];
    for (const chunk of file.chunks) {
      for (const change of chunk.changes) {
        if (change.type === 'add') {
          modifiedLines[file.to].push(change.ln);
        }
      }
    }
  }
  prevResults.modifiedLines = modifiedLines;

  // extract keys/paths from modifiedLines
  const filenamesList = Object.keys(modifiedLines);
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
