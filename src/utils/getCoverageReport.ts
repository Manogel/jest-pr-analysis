import fs from 'fs-extra';

export const getCoverageReport = (covReportPath: string) => {
  const results = fs.readJsonSync(covReportPath) as FormattedTestResults;

  return results;
};
