import { join, sep } from 'path';

import { getCoverageReport } from '~/utils/getCoverageReport';
export const parseCoverageReport = (covReportPath: string) => {
  const cwd = process.cwd() + sep;
  const relativePathToFile = join(cwd, covReportPath);
  const results = getCoverageReport(relativePathToFile);
  const {
    success,
    numTotalTestSuites,
    numPassedTestSuites,
    numFailedTests,
    numTotalTests,
    numFailedTestSuites,
    testResults,
  } = results;

  const filesList = testResults.flatMap((switchItem) => {
    const failedAssertions = switchItem.assertionResults.filter(
      ({ status }) => status === 'failed',
    );
    const parsedAssertions = failedAssertions.map((assertionItem) => {
      return {
        path: switchItem.name.replace(cwd, ''),
        starLine: assertionItem.location.line,
        endLine: assertionItem.location.line,
        title: assertionItem.ancestorTitles
          .concat(assertionItem.title)
          .join(' > '),
        messageError: assertionItem.failureMessages.join('\n\n'),
      };
    });

    return parsedAssertions;
  });

  return {
    success,
    numTotalTestSuites,
    numPassedTestSuites,
    numFailedTests,
    numTotalTests,
    numFailedTestSuites,
    failedTestDetails: filesList,
  };
};
