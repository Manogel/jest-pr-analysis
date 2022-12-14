import { getContentFile } from '~/utils/getContentFile';

const isFileLine = (lineArray: string[]) => {
  return lineArray[0].includes('.');
};

const isFolderLine = (lineArray: string[]) => {
  return !isFileLine(lineArray);
};

const formatArrayRows = (lineArray: string[]): ICoverageLine => {
  const [file, stmts, branch, funcs, lines, uncoveredLines = ''] = lineArray;

  return {
    file: file.trim(),
    stmts: Number(stmts.trim()),
    branch: Number(branch.trim()),
    funcs: Number(funcs.trim()),
    lines: Number(lines.trim()),
    uncoveredLines: uncoveredLines.trim()
      ? uncoveredLines.trim().split(',')
      : null,
  };
};

export const parseCoverageFromTextFile = (coverageFilePath: string) => {
  const txtContent = getContentFile(coverageFilePath);
  const fileLines = txtContent.split('\n');
  const filterReport = fileLines.filter(
    (line) => line.split('|').length === 6 && !line.includes('----'),
  );

  const [headerLine, ...filesLine] = filterReport;

  let lastMappedFolder = '';
  const mappedFoldersObj: IParsedCoverageObj = {};
  filesLine.forEach((lineString) => {
    const lineArray = lineString.split('|');

    const isFolder = isFolderLine(lineArray);
    const isFile = isFileLine(lineArray);

    if (isFolder) {
      lastMappedFolder = lineArray[0].trim();
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      mappedFoldersObj[lastMappedFolder] = mappedFoldersObj[
        lastMappedFolder
      ] || {
        filesCov: [],
        totalFilePathCov: {},
        isAllFilesLine: false,
      };
    }

    if (isFile) {
      // lineArray[0] = lastMappedFolder
      //   ? `${lastMappedFolder}/${lineArray[0].trim()}`
      //   : lineArray[0].trim();
      // lineArray[0] = lineArray[0].replace('//', '/');
      lineArray[0] = lineArray[0].trim();

      mappedFoldersObj[lastMappedFolder].filesCov.push(
        formatArrayRows(lineArray),
      );
    } else {
      mappedFoldersObj[lastMappedFolder].totalFilePathCov =
        formatArrayRows(lineArray);
      mappedFoldersObj[lastMappedFolder].isAllFilesLine =
        lastMappedFolder === 'All files';
    }
  });

  return {
    headerLine: headerLine.split('|').map((line) => line.trim()),
    filesLinesObj: mappedFoldersObj,
  };
};
