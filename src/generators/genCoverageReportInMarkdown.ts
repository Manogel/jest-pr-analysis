import markdownTable from 'markdown-table';
import { parseCoverageFromTextFile } from '~/utils/parseCoverageFromTextFile';
import { parseMarkdownTemplate } from '~/utils/parseMarkdownTemplate';

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

const coverageDataToArrayString = (covData: ICoverageLine) => {
  const isFile = (name: string) => name.includes('.');
  const formattedFilename = isFile(covData.file)
    ? `📌 ${covData.file}`
    : covData.file;

  return [
    formattedFilename,
    String(covData.stmts),
    String(covData.branch),
    String(covData.funcs),
    String(covData.lines),
    covData.uncoveredLines?.join(',') ?? ' ',
  ];
};

const _calculateCoverageStatusColor = ({ lines }: ICoverageLine) => {
  let color = 'red';
  if (lines > 40) color = 'orange';
  else if (lines > 60) color = 'yellow';
  else if (lines > 80) color = 'green';
  else if (lines > 90) color = 'brightgreen';
  return color;
};

const makeFilesCovRows = (folders: IParsedCoverageObj) => {
  const covRows: string[][] = [];

  for (const pathFolder of Object.keys(folders)) {
    const files = folders[pathFolder].filesCov;

    if (!files.length) continue;
    const pathCov = folders[pathFolder].totalFilePathCov;

    covRows.push(coverageDataToArrayString(pathCov));
    files.forEach((item) => {
      covRows.push(coverageDataToArrayString(item));
    });
  }

  return covRows;
};

export const genCoverageReportInMarkdown = (coverageTextFilePath: string) => {
  const results = parseCoverageFromTextFile(coverageTextFilePath);
  const covRows = makeFilesCovRows(results.filesLinesObj);
  const mkTable = createReportTable([
    coverageDataToArrayString(results.allFilesLine),
    ...covRows,
  ]);

  const content = parseMarkdownTemplate('default', {
    covTable: mkTable,
    title: 'Coverage report',
  });

  return content;
};
