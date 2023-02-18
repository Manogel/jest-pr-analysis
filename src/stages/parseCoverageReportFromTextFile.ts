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

const parseFilesLine = (filesLine: string[]) => {
  let lastMappedFolder = '';
  const mappedFoldersObj: IParsedCoverageObj = {} as IParsedCoverageObj;
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
  return mappedFoldersObj;
};

export const parseCoverageReportFromTextFile = (coverageFilePath: string) => {
  const txtContent = getContentFile(coverageFilePath);

  /**
   * Filter files coverage (example):
   *
   * -------------------|---------|----------|---------|---------|-------------------
   * File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
   * -------------------|---------|----------|---------|---------|-------------------
   * All files          |   54.65 |       70 |   64.86 |   54.86 |
   *  src               |       0 |        0 |       0 |       0 |
   */
  const fileLines = txtContent.split('\n');
  const filterReport = fileLines.filter(
    (line) => line.split('|').length === 6 && !line.includes('----'),
  );

  const [_headerLine, ...filesLine] = filterReport;
  const filesLinesObj = parseFilesLine(filesLine);

  return filesLinesObj;
};
