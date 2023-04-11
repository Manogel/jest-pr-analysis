import micromatch from 'micromatch';

import { getPrDiffFiles } from '~/stages/getPrDiffFiles';
import { getRelatedTestFiles } from '~/stages/getRelatedTestFiles';
import { IPrModifiedLines } from '~/stages/types';
import { getJestParams } from '~/utils/getJestParams';

const normalizeChangedFilePath = (
  changedFilePath: string,
  jestRootDir: string | null,
) => {
  const formattedPath =
    jestRootDir != null
      ? changedFilePath.split(`${jestRootDir}/`)[1]
      : changedFilePath;
  return formattedPath;
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
    const isChangedFile = micromatch.isMatch(
      file.to,
      jestParams.collectCoverageFrom,
    );
    if (!isChangedFile) continue;
    const filePath = normalizeChangedFilePath(file.to, jestParams.rootDir);
    modifiedLines[filePath] = [];
    for (const chunk of file.chunks) {
      for (const change of chunk.changes) {
        if (change.type === 'add') {
          modifiedLines[filePath].push(change.ln);
        }
      }
    }
  }
  prevResults.modifiedLines = modifiedLines;

  // extract keys/paths from modifiedLines
  const changedFilesArray = Object.keys(modifiedLines);
  prevResults.prChangedFiles = changedFilesArray;

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
