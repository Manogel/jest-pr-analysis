import { join, sep } from 'path';

import { getJsonReport } from '~/utils/getJsonReport';

export const parseCoverageSummaryFromJsonFile = (covReportPath: string) => {
  const cwd = process.cwd() + sep;
  const relativePathToFile = join(cwd, covReportPath);
  const results = getJsonReport<ReportSummaryJSON>(relativePathToFile);
  const { total: totalResultLine, ...restResultLines } = results;

  const mappedFoldersObj: IParsedCoverageObj = {
    'All files': {
      isAllFilesLine: true,
      totalFilePathCov: {
        lines: totalResultLine.lines.pct,
        branch: totalResultLine.branches.pct,
        funcs: totalResultLine.functions.pct,
        stmts: totalResultLine.statements.pct,
        uncoveredLines: null,
        file: 'All files',
      },
      filesCov: Object.entries(restResultLines).map(([key, value]) => {
        const relativePath = key.replace(cwd, '');
        return {
          lines: value.lines.pct,
          branch: value.branches.pct,
          funcs: value.functions.pct,
          stmts: value.statements.pct,
          uncoveredLines: null,
          file: relativePath,
        };
      }),
    },
  };

  return mappedFoldersObj;
};
