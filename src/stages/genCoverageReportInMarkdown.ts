import markdownTable from 'markdown-table';

import { parseMarkdownTemplate } from '~/utils/parseMarkdownTemplate';

interface ICoverageArrayOptions {
  statusIcon?: boolean;
}

const createReportTable = (rows: string[][]) => {
  return markdownTable(
    [
      [
        'File',
        '% Stmts',
        '% Branch',
        '% Funcs',
        '% Lines',
        'Uncovered Line #s',
      ],
      ...rows,
    ],
    { align: ['l', 'c', 'c', 'c', 'c', 'l'] },
  );
};

const coverageDataToArrayString = (
  covData: ICoverageLine,
  options: ICoverageArrayOptions,
) => {
  const { statusIcon = false } = options;
  const isFile = (name: string) => name.includes('.');
  let formattedFilename = covData.file;

  if (isFile(covData.file)) {
    formattedFilename = `📌 ${covData.file}`;
  } else if (covData.file === 'All files') {
    formattedFilename = `📦 ${covData.file}`;
  } else {
    formattedFilename = `• ${covData.file}`;
  }

  const stmtsText = `${
    statusIcon ? getCoverageStatusIcon(covData.stmts) : ''
  } ${covData.stmts}`.trim();
  const branchText = `${
    statusIcon ? getCoverageStatusIcon(covData.branch) : ''
  } ${covData.branch}`.trim();
  const funcsText = `${
    statusIcon ? getCoverageStatusIcon(covData.funcs) : ''
  } ${covData.funcs}`.trim();
  const linesText = `${
    statusIcon ? getCoverageStatusIcon(covData.lines) : ''
  } ${covData.lines}`.trim();

  return [
    formattedFilename,
    stmtsText,
    branchText,
    funcsText,
    linesText,
    covData.uncoveredLines?.join(',') ?? ' ',
  ];
};

const getCoverageStatusIcon = (percent: number) => {
  let color = '🔴';
  if (percent > 90) color = '🟢';
  else if (percent > 80) color = '🟡';
  else if (percent > 60) color = '🟠';
  return color;
};

const makeFilesCovRows = (folders: IParsedCoverageObj) => {
  const covRows: string[][] = [];

  for (const pathFolder of Object.keys(folders)) {
    const files = folders[pathFolder].filesCov;
    const pathCov = folders[pathFolder].totalFilePathCov;
    const isAllFilesLine = folders[pathFolder].isAllFilesLine;

    covRows.push(
      coverageDataToArrayString(pathCov, { statusIcon: isAllFilesLine }),
    );

    if (!files.length) {
      continue;
    }

    files.forEach((item) => {
      covRows.push(coverageDataToArrayString(item, { statusIcon: false }));
    });
  }

  return covRows;
};

/**
 * Generate coverage report in markdown
 */
export const genCoverageReportInMarkdown = (
  filesLinesObj: IParsedCoverageObj,
) => {
  const covRows = makeFilesCovRows(filesLinesObj);
  const mkTable = createReportTable(covRows);

  const content = parseMarkdownTemplate('default', {
    covTable: mkTable,
    title: 'Coverage report',
  });

  return content;
};
