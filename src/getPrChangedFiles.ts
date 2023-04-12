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

  const modifiedLines: IPrModifiedLines = {};

  for (const file of filesDiffList) {
    if (!file.to) continue;
    const isChangedFile = !!micromatch(
      [file.to],
      jestParams.collectCoverageFrom,
    ).length;
    if (!isChangedFile) continue;
    const relativeFilePath = file.to;
    modifiedLines[relativeFilePath] = [];
    for (const chunk of file.chunks) {
      for (const change of chunk.changes) {
        if (change.type === 'add') {
          modifiedLines[relativeFilePath].push(change.ln);
        }
      }
    }
  }

  const relativeFilesPath = Object.keys(modifiedLines);
  prevResults.modifiedLines = modifiedLines;
  // extract keys/paths from modifiedLines
  prevResults.prChangedFiles = relativeFilesPath.map((filePath) =>
    normalizeChangedFilePath(filePath, jestParams.rootDir),
  );

  if (prevResults.prChangedFiles.length <= 0) {
    return prevResults;
  }

  // Get related test files (*.spec.ts, *.test.ts)
  const filesToTestArray = await getRelatedTestFiles(
    relativeFilesPath,
    jestParams.testRegex,
  );
  prevResults.filesToTest = filesToTestArray;

  return prevResults;
};
