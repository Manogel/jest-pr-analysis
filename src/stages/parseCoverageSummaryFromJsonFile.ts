import { join, sep } from 'path';

import { getJsonReport } from '~/utils/getJsonReport';

export const parseCoverageSummaryFromJsonFile = (covReportPath: string) => {
  const cwd = process.cwd() + sep;
  const relativePathToFile = join(cwd, covReportPath);
  const results = getJsonReport<ReportSummaryJSON>(relativePathToFile);

  const mappedFoldersObj: IParsedCoverageObj = {
    'All files': {
      isAllFilesLine: true,
      totalFilePathCov: {
        lines: results.total.lines.pct,
        branch: results.total.branches.pct,
        funcs: results.total.functions.pct,
        stmts: results.total.statements.pct,
        uncoveredLines: null,
        file: 'All files',
      },
      filesCov: Object.entries(results).map(([key, value]) => {
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
